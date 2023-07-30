import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCommentApi, createArticleApi, deleteArticleApi, editArticleApi, getArticleApi, getArticleByIdApi } from "./articleApi";


export const createArticle = createAsyncThunk(
    'article/create',
    async (article) => {
      
      const data = await createArticleApi(article);
      return data;
    }
  );
export const getArticle = createAsyncThunk(
    'article/get',
    async (search) => {
      
      const data = await getArticleApi(search);
      return data;
    }
  );
export const getArticleById = createAsyncThunk(
    'article/getById',
    async (id) => {
      console.log(id);
      const data = await getArticleByIdApi(id);
      return data;
    }
  );
   
  export const editArticle = createAsyncThunk(
    'article/edit',
    async (article) => {
      
      const data = await editArticleApi(article);
      return data;
    }
  );
  
  export const addComment = createAsyncThunk(
    'article/addComment',
    async (article) => {
      
      const data = await addCommentApi(article);
      return data;
    }
  );
  
  export const deleteArticle = createAsyncThunk(
    'article/delete',
    async (id) => {
      const data = await deleteArticleApi(id);
      return data;
    }
  );
  

const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        loading:false,
        error:false,
        message:null,
        articles:[],
        article:{}
     },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createArticle.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(createArticle.fulfilled, (state, action) => {
            state.loading=false
            state.message=action.payload.message;
        }),
        builder.addCase(createArticle.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        }),
        builder.addCase(getArticle.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(getArticle.fulfilled, (state, action) => {
            state.loading=false
            state.articles=action.payload.articles;
        }),
        builder.addCase(getArticle.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        }),
        builder.addCase(getArticleById.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(getArticleById.fulfilled, (state, action) => {
            state.loading=false
            state.article=action.payload.article;
        }),
        builder.addCase(getArticleById.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        })
        builder.addCase(editArticle.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(editArticle.fulfilled, (state, action) => {
            state.loading=false
            state.message=action.payload.message;
        }),
        builder.addCase(editArticle.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        }),
        builder.addCase(deleteArticle.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(deleteArticle.fulfilled, (state, action) => {
            state.loading=false
            state.message=action.payload.message;
            const articleId=action.payload.articleId;
            state.articles=state.articles.filter((article) => article._id !== articleId);


        }),
        builder.addCase(deleteArticle.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        }),
        builder.addCase(addComment.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.loading=false
            state.message=action.payload.message;
            


        }),
        builder.addCase(addComment.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        })
       
          
      
    }
  });
  export default articleSlice.reducer;