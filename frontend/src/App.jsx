import BlogDetails from "./pages/BlogDetails";
import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import WriteBlog from "./pages/WriteBlog";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { useEffect } from "react";
import { loadUser } from "./redux/userSlice/userSlice";
import Navbar from "./componets/Navbar";
import Loader from "./componets/Loader";

function App() {
  const dispatch=useDispatch()
  const { isAuthenticated,user,loading } = useSelector((state) => state.users);
   
    useEffect(() => {
   dispatch(loadUser())
  }, [dispatch])

 
  return (
    <>
      <BrowserRouter>
       { loading?(<Loader/>):(<><Navbar user={user} isAuthenticated={isAuthenticated}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog/create" element={ <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
          <WriteBlog />
              </ProtectedRoute>} />
          <Route
            path="/register"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                <Register/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                <Login/>
              </ProtectedRoute>
            }
          />
        </Routes></>)}
      </BrowserRouter>
    </>
  );
}

export default App;
