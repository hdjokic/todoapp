import Todo from "./Todo";

import { StateContext } from "../context";
import { useContext } from "react";

export default function PostList() {
  const { state } = useContext(StateContext);
  const { posts } = state;
  //console.log(posts);
  return (
     <div>
      <div>
        {posts.length === 0 && <h2>No posts found.</h2>}
        {posts.length > 0 && posts.map((p, i) => <Todo {...p} key={p._id} />)}
      </div>
    </div>
  );
}
