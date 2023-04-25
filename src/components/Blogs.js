import React from "react";
// react-query
import { useQuery } from "react-query";
// components
import Notification from "./Notification";
import Blog from "./Blog";
// services
import blogService from "../services/blogs";

const Blogs = ({ notification, user, handleLogout, createNewBlog, token }) => {
  //======================================================//
  const blogsWQuery = useQuery(
    "blgs",
    () => token && blogService.getAll(token)
  );

  if (blogsWQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const blogs = blogsWQuery.data;

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
