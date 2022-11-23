function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function postReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      //console.log(action);
      const newPost = {
        title: action.title,
        content: action.content,
        author: action.author,
        completed: action.completed,
        _id: action._id 
      };
      return [newPost, ...state];

    case "FETCH_POSTS":
      return action.posts;

    case "DELETE_POST":
      //console.log("here");
      //console.log(state);
      //console.log(action);
      return state.filter((post)=>post._id !== action.id);

    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo._id !== action.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        };
      });
      
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: postReducer(state.posts, action),
  };
}
