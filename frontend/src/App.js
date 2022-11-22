import React, { useState, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useResource } from "react-request-hook";
import UserBar from "./user/UserBar";

import appReducer from "./reducers";
import PostTodo from "./post/PostTodo";
import CreateTodo from "./post/CreateTodo";

import { StateContext } from "../src/context";

function App() {
  const initialPosts
   = [
  ];


  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialPosts
    ,
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s Todo`;
    } else {
      document.title = "Todo";
    }
  }, [user]);

 
  const [posts, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` }
  }));

  // useEffect(getPosts, []);
  useEffect(() => {
    getPosts();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (posts && posts.isLoading === false && posts.data) {
      console.log(posts.data);
      dispatch({ type: "FETCH_POSTS", posts: posts.data.posts.reverse()});
      
    }
  }, [posts]);
  console.log(posts);
   
  return (
    <div>
      
      <StateContext.Provider value={{ state, dispatch }}>
    
        <UserBar/>
        <>
      {posts?.isLoading && "Posts loading..."} <PostTodo />
    </>
        {state.user && <CreateTodo />
}
      </StateContext.Provider>
    </div>
    
  );

 
}

export default App;