import React from "react";
import { useRef } from "react";
// react-query
import {
  useQuery,
  QueryClient,
  useMutation,
  useQueryClient,
} from "react-query";
// components
import Notification from "./Notification";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
// services
import blogService from "../services/blogs";
// context
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Blogs = ({ user, handleLogout, token }) => {
  //======================================================//
  const queryClient = useQueryClient();

  //======================================================//
  // context for notification
  //======================================================//
  const [notification, notificationDispatch] = useContext(NotificationContext);
  //======================================================//
  // query mutation
  const newBlogMutation = useMutation(blogService.createNew);
  //======================================================//
  const blogsWQuery = useQuery("blgs", () => blogService.getAll(token));

  const blogFormRef = useRef();

  if (blogsWQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const blogs = blogsWQuery.data;

  //======================================================//
  const createNewBlog = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  );
  //======================================================//
  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisible();
    const newBlog = {
      title,
      author,
      url,
      user: user.id,
    };
    newBlogMutation.mutate(
      { blog: newBlog, token },
      {
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries("blgs");
          notificationDispatch({
            type: "INFO",
            payload: `a new blog ${newBlog.title}! by ${newBlog.author} added`,
          });
          setTimeout(() => {
            notificationDispatch({ type: "CLEAR" });
          }, 5000);
        },
        onError: (err) => {
          notificationDispatch({
            type: "WARNING",
            payload: `Fill out all the fields.`,
          });
          setTimeout(() => {
            notificationDispatch({ type: "CLEAR" });
          }, 5000);
        },
      }
    );
  };

  //======================================================//
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {`${user.username} is logged in`}{" "}
        <button onClick={handleLogout}>logout</button>{" "}
      </p>
      {createNewBlog()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            token={token}
            username={user.username}
          />
        ))}
    </div>
  );
};

export default Blogs;
