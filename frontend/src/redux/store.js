import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import articleSlice from "./articleSlice/articleSlice";

const store = configureStore({
    reducer: {
      users: userSlice,
      articles:articleSlice
    },
  })



 

  export default store