

  import { useState, useEffect, useContext } from "react";
  import { useResource } from "react-request-hook";
  
  import { StateContext } from "../context";
  import appReducer from "../reducers";

  import { BrowserRouter, Routes, Route } from "react-router-dom";
  
  
  export default function Post({ title, content, author, date1, _id, completed }) {
    var [completedDate, setDateCompleted] = useState("");
    
    
    const {state, dispatch } = useContext(StateContext);
  
    const [posts, deletePost] = useResource((_id) => ({
      url: `post/${_id}`,
      method: "delete",
      headers: { Authorization: `${state.user.access_token}` },
    }));
  
    //useEffect(deletePost, []);
  
    // useEffect(() => {
    //   if (posts && posts.data) {
    //     dispatch({ type: "DELETE_POST", id:_id});
    //   }
    // }, [posts]);
   

    //TOGGLE_POST

     const [_, togglePost] = useResource((_id, completed) => ({
      url: `post/${_id}`,
      method: "put",
      headers: { Authorization: `${state.user.access_token}` },
      data:{_id, completed},
    }));
  
    // useEffect(togglePost, []);
  
    // useEffect(() => {
    //   if (posts && posts.data) {
    //     dispatch({ type: "TOGGLE_POST", id:_id, completed:completed});
    //   }
    // }, [posts]);
 
    return (
  
      <div>
        <h3>{title}</h3>
        <div>{content}</div>
        <br />
        <i>
          Written by <b>{author}</b>
          <br />
          Created on: {date1} .
        </i>
        <div>
          <form>
            <input
              type="checkbox"
              checked={!!completed}
              onChange={() => togglePost({_id})}
              // name="Completed"
              // type="checkbox"
              // // complete={complete}
              //  onChange={() => togglePost(id)}
              />
              {/* <label for="Completed">Completed</label><br></br> */}
              
            
          </form>
            
          <button 
            onClick={()=>{deletePost(_id);dispatch({ type: "DELETE_POST", id:_id});}}>
          {/* onClick={()=>deletePost(this.dispatch({type:'DELETE_POST', id:this.props.post.id}))}> */}
            Delete</button>
  
          {/* Completed on: {completedDate} */}
        </div>
    
      </div>
  
    );
  
    
  
    // function toggle(value){
    //   if (!value){
    //      completedDate=Date();
    //      setDateCompleted(completedDate);
    //   }
    //   if(value){
    //     completedDate=null;
    //     setDateCompleted(completedDate);
    //   }
  
    //   return !value;
    // }
  
    
    
  }

  