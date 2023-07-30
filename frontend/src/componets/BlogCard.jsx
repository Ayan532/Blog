import { Link } from "react-router-dom"
import { getTextFromHtml } from "../helpers/htmlParser"
import {TfiCommentAlt} from 'react-icons/tfi'
import { useState } from "react"
import Comments from "./Comments"


const BlogCard = ({article}) => {
  const [commentOpen,setCommentOpen]=useState(false)
  return (
    <div className={"max-w-sm cursor-pointer rounded overflow-hidden shadow-lg"}>
   
   <Link to={`/blog/${article?._id}`} >  <img className="w-full h-1/4" src={article?.poster?.url} alt="poster"/></Link>


  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{article.title}</div>
    <p className="text-gray-700 text-base line-clamp-5">
      {getTextFromHtml(article.description)}
    </p>
  </div>
   
  <div className='px-6 pb-4 flex gap-2 items-center ' onClick={()=>setCommentOpen(!commentOpen)}>
             
            <TfiCommentAlt className="text-xl" /> 
           
        </div>

        {commentOpen && <div className="">
            {commentOpen && <Comments id={article._id} comments={article.comments}/>}
        </div>}
   
</div>
  )
}

export default BlogCard