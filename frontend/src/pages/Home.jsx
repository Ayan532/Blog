import { useEffect, useState } from "react"
import BlogCard from "../componets/BlogCard"
import { useDispatch, useSelector } from "react-redux"
import { getArticle } from "../redux/articleSlice/articleSlice"
import { AiOutlineSearch } from "react-icons/ai"
import Loader from "../componets/Loader"



const Home = () => {
  const dispatch=useDispatch()
  const {articles,loading}=useSelector((state)=>state.articles)
  const [search,setSearch]=useState('')

  useEffect(()=>{
     dispatch(getArticle())
  },[dispatch])

  const handleSearch=()=>{
    dispatch(getArticle(search))
  }
  return (
    loading?<Loader/>: <div>
       
        <div className="mt-10 container p-10 w-full flex-col items-center gap-3 md:flex-row md:gap-0 flex justify-between ">
          <h1 className="text-2xl xl:text-3xl font-extrabold mb-3">All Articles</h1>
          <div className="flex justify-between items-center gap-2 border border-1 border-black rounded-md p-2">
            <input type="search"  placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} className="outline-none w-full"/>
            <AiOutlineSearch  onClick={handleSearch} className="text-2xl text-black"/>
        
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {articles.length>0 && articles && articles.map((article)=><BlogCard  key={article._id} article={article}/>)}
        </div>
    </div>
  )
}

export default Home