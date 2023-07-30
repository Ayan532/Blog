
import { useEffect } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteArticle, getArticleById } from "../redux/articleSlice/articleSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTextFromHtml } from "../helpers/htmlParser";
import { format } from 'timeago.js'
import Loader from "../componets/Loader";

const BlogDetails = () => {
  const {user:me}=useSelector(state=>state.users)
  const params=useParams()
  const navigate=useNavigate()
  const {article,loading}=useSelector((state)=>state.articles)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getArticleById(params.id))
  },[dispatch,params.id])

  const handleDeleteArticle=async()=>{
    await dispatch(deleteArticle(params.id))
    navigate("/")
  }
  return (
     loading?(<Loader/>):(<div className="w-full h-screen">
    
      <div className="p-10 pb-0">
        <img
          className="w-full h-[400px] object-cover"
          src={article?.poster?.url}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="flex flex-col px-10 mt-2">
        <div className="flex gap-2  items-center w-full">
          <img
            className="w-12 h-12 rounded-full"
            src={article?.user?.avatar?.url}
            alt="user_profile"
          />
          <div className="flex flex-col w-full">
            <p className="text-sm">{article?.createdBy}</p>

            <div className="flex gap-5 w-full justify-between items-center">
              <p className="text-sm">{format(article?.createdAt)}</p>
              {me?._id===article?.user?._id &&<div className="flex gap-5">
                <Link to={`/blog/create?edit=${article?._id}`} state={article} ><button>
                  <AiFillEdit className="text-3xl text-blue-500" />
                </button></Link>
                <button >
                  <AiOutlineDelete onClick={handleDeleteArticle} className="text-3xl text-red-500" />
                </button>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <div className="px-10">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-justify text-gray-500 mt-2">
             
            {getTextFromHtml(article.description)}
           
        </p>
      </div>
    </div>)
  );
};

export default BlogDetails;
