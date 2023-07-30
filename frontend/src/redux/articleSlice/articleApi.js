import axios from "axios";
import { SERVER } from "../../helpers/serverImport";

export const createArticleApi= async (formData) => {
    
    const {data}=await axios.post(`${SERVER}/article/create`,formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true
    })
  
    return data;
  };
export const getArticleApi= async (search="") => {
    
    const {data}=await axios.get(`${SERVER}/article?keyword=${search}`,{
    
        withCredentials:true
    })
  
    return data;
  };
export const getArticleByIdApi= async (id) => {
    console.log(id);
    const {data}=await axios.get(`${SERVER}/article/${id}`,{
    
        withCredentials:true
    })
  
    return data;
  };

  export const editArticleApi= async (obj) => {
    const {myForm,id}=obj
    const {data}=await axios.put(`${SERVER}/article/edit/${id}`,myForm,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true
    })
  
    return data;
  };
  export const addCommentApi= async (obj) => {
    const {comment,id}=obj
    const {data}=await axios.post(`${SERVER}/article/comment/add/${id}`,{comment},{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    })
  
    return data;
  };
  export const deleteArticleApi= async (id) => {
  
    const {data}=await axios.delete(`${SERVER}/article/delete/${id}`,{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    })
  
    return data;
  };