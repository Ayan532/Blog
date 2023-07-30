
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = ({isAuthenticated,children,redirect='/login',redirectAdmin='/me',isAdmin,adminRoute}) => {
    if(!isAuthenticated){
        return <Navigate to={redirect}/>
    }

 
  return children?children : <Outlet/>
}

export default ProtectedRoute