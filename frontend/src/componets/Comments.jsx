import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getArticle } from "../redux/articleSlice/articleSlice";

const Comments = ({id,comments}) => {
    const {user:me,isAuthenticated}=useSelector(state=>state.users)
    const [comment,setComment]=useState('')
    const dispatch=useDispatch()
    const handleAddComment=async(e)=>{
        e.preventDefault()
         if(comment=="") return;
      await  dispatch(addComment({comment,id}))
      dispatch(getArticle())
      setComment('')
    }
  
  return (
    <div className="w-full h-full">
      {isAuthenticated&&<form onSubmit={handleAddComment} className="flex gap-3 justify-between items-center p-3">
        <img
          className="w-[40px] h-[40px] rounded-full "
          src={me?.avatar?.url}
          alt=""
        />
        <div className="flex justify-center items-center w-full flex-5">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="w-full border-2 py-1 px-2  rounded-lg border-gray-500 outline-none focus:border-[#5271ff]"
            placeholder="Write a comment"
          />
        </div>
        <button
          type="submit"
          className="py-1 px-2 bg-[#5271ff] flex-1 text-white rounded-lg"
        >
          Send
        </button>
      </form>}
 {   comments.length>0?<div className="h-32 overflow-y-scroll">

      {comments && comments.map((comment,i) => (
        <div key={i}  className="flex gap-7 md:gap-10 lg:gap-3 justify-between items-center p-3 md:p-3 flex-[1] md:flex-[0]">
          <img
            className="w-[40px] h-[40px] rounded-full "
            src={comment.user.avatar.url}
            alt=""
          />
          <div className="flex flex-col justify-center items-start flex-[15]">
            <span className="text-sm font-semibold md:text-xl  md:font-semibold lg:text-sm">
              {comment.user.name}
            </span>
            <span
              className="text-xs  md:text-gray-600 md:text-lg lg:text-xs"
              style={{ textAlign: "left" }}
            >
              {comment.comment}
            </span>
          </div>
        </div>
      ))}
     </div>:<h1 className="px-6 py-1">No comments</h1>}
    </div>
  );
};

export default Comments;
