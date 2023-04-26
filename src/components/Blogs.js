import React from "react";
import { useRef } from "react";
// react-query
import { useQuery, useMutation, useQueryClient } from "react-query";
// components
import Notification from "./Notification";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import UserInfo from "./UserInfo";
// services
import blogService from "../services/blogs";
// context
import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import CredentialsContext from "../CredentialsContext";

const Blogs = () => {
  //======================================================//
  const queryClient = useQueryClient();
  //======================================================//
  // contexts for notification and credentials
  //======================================================//
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  //======================================================//
  // query mutation
  const newBlogMutation = useMutation(blogService.createNew);
  //======================================================//
  const blogFormRef = useRef();
  //======================================================//
  const blogsWQuery = useQuery("blgs", () =>
    blogService.getAll(credentials.token)
  );
  if (blogsWQuery.isLoading) {
    return <div>Loading...</div>;
  }
  const blogs = blogsWQuery.data;
  //======================================================//
  const postNotification = ({ type, payload }) => {
    notificationDispatch({ type, payload });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 3000);
  };
  //======================================================//
  const createNewBlog = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  );
  //======================================================//
  const handleLogout = () => {
    window.localStorage.clear();
    credentialsDispatch({ type: "LOGOUT" });
  };
  //======================================================//
  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisible();
    const newBlog = {
      title,
      author,
      url,
      user: credentials.user.id,
    };
    newBlogMutation.mutate(
      { blog: newBlog, token: credentials.token },
      {
        onSuccess: ({ data }) => {
          postNotification({
            type: "INFO",
            payload: `a new blog ${newBlog.title}! by ${newBlog.author} added`,
          });
          queryClient.invalidateQueries("blgs");
        },
        onError: (err) => {
          postNotification({
            type: "WARNING",
            payload: `Fill out all the fields.`,
          });
        },
      }
    );
  };
  // return===============================================//
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <UserInfo />
      {createNewBlog()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            token={credentials.token}
            username={credentials.user.username}
          />
        ))}
    </div>
  );
};

export default Blogs;
