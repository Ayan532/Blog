import { useState } from "react"
import { AiFillFileAdd } from "react-icons/ai"
import { ImBlogger } from "react-icons/im"
import { TbHexagonLetterB, TbHexagonLetterG, TbHexagonLetterL, TbHexagonLetterO } from "react-icons/tb"
import { Link } from "react-router-dom"
import { logoutUser } from "../redux/userSlice/userSlice"
import { useDispatch } from "react-redux"


const Navbar = ({user,isAuthenticated}) => {
  const[openProfileModal,setProfileModal]=useState(false)
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(logoutUser())
    setProfileModal(!openProfileModal)
  }
  
  return (
    <nav className="bg-gray-800 sticky top-0 z-10">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
         <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
        
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
       
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <Link to="/"><div className="flex flex-shrink-0 items-center">
         <TbHexagonLetterB className="text-white text-5xl"/>
         <TbHexagonLetterL className="text-white text-4xl"/>
         <TbHexagonLetterO className="text-white text-4xl"/>
         <TbHexagonLetterG className="text-white text-4xl"/>
        </div></Link> 
        {/* <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
           
            <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
          </div>
        </div> */}
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
       { isAuthenticated&&<Link to={"/blog/create"}><button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Add</span>
          <AiFillFileAdd className="text-2xl"/>
        </button></Link>}

      
        <div className="relative ml-3">
        {isAuthenticated?<div>
            <button onClick={()=>setProfileModal(!openProfileModal)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              {user&&<img className="h-8 w-8 rounded-full" src={user?.avatar?.url} alt=""/>}
            </button>
          </div>:<Link to="/login"><button className="relative flex  text-white rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >Login</button></Link>}

   
          {openProfileModal&&<div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
     
            <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</button>
            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
          </div>}
        </div>
      </div>
    </div>
  </div>

</nav>
  )
}

export default Navbar