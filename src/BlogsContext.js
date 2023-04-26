import { createContext, useReducer } from "react";

const blogsReducer = (state, action) => {
  switch (action.type) {
    case "GETBLOGS":
      return action.payload;
    case "ERASEBLOGS":
      return null;
    default:
      return state;
  }
};

const BlogsContext = createContext();

export const BlogsContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, null);

  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  );
};

export default BlogsContext;
