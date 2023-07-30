import axios from "axios";
import { SERVER } from "../../helpers/serverImport";

export const registerUserApi= async (formData) => {
    
    const {data}=await axios.post(`${SERVER}/users/auth/register`,formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true
    })
  
    return data;
  };
export const loginUserApi= async (obj) => {

    const {email,password}=obj
    
    const {data}=await axios.post(`${SERVER}/users/auth/login`,{email,password},{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    })
  
    return data;
  };


export const loadUserApi= async () => {
       
    const {data}=await axios.get(`${SERVER}/users/me`,{
     
        withCredentials:true
    })
    
    return data;
  };
export const logoutUserApi= async () => {
       
    const {data}=await axios.get(`${SERVER}/users/auth/logout`,{
     
        withCredentials:true
    })
    
    return data;
  };