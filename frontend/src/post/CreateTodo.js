import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [completed, setCompleted] = useState(false);
  const [dateCompleted, setDate] = useState("");
  const [error, setError] = useState(false);
  //console.log(completed);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;


  const [post, createPost] = useResource(({ title, content, author, completed, dateCompleted }) => ({ //completed
    url: "post",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    data: { title, content, completed, dateCompleted}, //completed
    
  }));
  //console.log(dateCompleted);
  

  useEffect(() => {
    if (post?.error) {
      setError(true);
      //alert("Something went wrong creating post.");
    }
    if (post?.isLoading === false && post?.data) {
      dispatch({
        type: "CREATE_POST",
        title: post.data.title,
        content: post.data.content,
        author: post.data.author,
        completed: post.data.completed,
        dateCompleted:post.data.dateCompleted,
        _id: post.data._id,
      });
    }
  }, [post]);
  //console.log(title);
  //console.log(dateCompleted);


  return (
    <form
      onSubmit={(e) => {
        
        e.preventDefault();
        //console.log(completed);
        createPost({ title, content, author: user.username, completed, dateCompleted }); //completed
      }}
      
      
    >
      
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          required
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div
        value={completed}
        onChange={(event) => setCompleted(event.target.value)}
       
      />
      <div
        value={dateCompleted}
        onChange={(event) => setDate(event.target.value)}
       
      />

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
}
