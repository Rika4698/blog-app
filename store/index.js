import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./blogAPI";
import { subscriptionAPI } from "./subscriptionAPI"; 

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [subscriptionAPI.reducerPath]: subscriptionAPI.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(subscriptionAPI.middleware), 
});