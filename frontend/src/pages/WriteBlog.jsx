

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsUpload } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { createArticle, editArticle } from "../redux/articleSlice/articleSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../componets/Loader";


const WriteBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation().search

  const state = useLocation().state;
  
  const [value, setValue] = useState(state ? state.description : "");
  const [title, setTitle] = useState(state ? state.title : "");
  const [poster, setPoster] = useState("");
  const [loading,setLoading]=useState(true)
  const [posterPrev, setPosterPrev] = useState(state ? state.poster.url : "");

  useEffect(()=>{
    setLoading(false)
  },[])
  const handleImageChange = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // Access the image data as reader.result
          setPosterPrev(reader.result);
          setPoster(file); // Update the avatar state here
        };
      }
    };
  };
  const handlePublish = async () => {

    if(state){
      const myForm = new FormData();
      (state && state.title==title)?myForm.append("title", ""):myForm.append("title", title);
      (state && state.description==value)?myForm.append("description", ""):myForm.append("description", value);
      (state && state.poster.url==posterPrev)?myForm.append("file", ""):myForm.append("file", poster);
      const id=location.split("=")[1]
      console.log(id);
      await dispatch(editArticle({myForm,id}))
    }else{
      const myForm = new FormData();
      myForm.append("title", title);
      myForm.append("description", value);
      myForm.append("file", poster);
      await dispatch(createArticle(myForm));

    }
    navigate("/");
  };

  
  return (
    loading?<Loader/> :<div className="w-full h-screen z-0">
      <div className=" m-10 mb-0 h-[400px] rounded-md border relative  border-1 border-black flex justify-center items-center">
        {posterPrev !== "" ? (
        <>
            <MdOutlineCancel onClick={()=>setPosterPrev("")} className="absolute rounded-full -top-7 -right-2 text-4xl text-white bg-red-500 "/>
            <img
              className="w-full h-full"
              src={posterPrev}
              alt="poster"
            />
         
              
            
        </>
        
        ) : (
          <BsUpload className="text-4xl" onClick={handleImageChange} />
        )}
      </div>
      <div className="px-10 flex flex-col gap-4 mt-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Please Enter a Title"
        />
        <div className="h-[250px] overflow-scroll">
          <ReactQuill
            className="h-full border-none"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="flex justify-end px-10 pb-5 sticky bottom-0">
        <button
          onClick={handlePublish}
          className="w-[200px] mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100  py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <span className="ml-3">{state ? "Update" : "Publish"}</span>
        </button>
      </div>
    </div>
  );
};

export default WriteBlog;
