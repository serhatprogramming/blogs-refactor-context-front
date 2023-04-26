import React from "react";
import { useParams } from "react-router";
// context
import { useContext, useState } from "react";
import CredentialsContext from "../CredentialsContext";
import BlogsContext from "../BlogsContext";
// services
import blogService from "../services/blogs";
// router
import { useNavigate } from "react-router";

const BlogDetail = () => {
  const id = useParams().id;
  //======================================================//
  //======================================================//
  // contexts for credentials
  const [blogs, blogsDispatch] = useContext(BlogsContext);
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  //======================================================//
  const navigate = useNavigate();
  //======================================================//

  const blog = blogs.find((blog) => blog.id == id);

  const [likeCount, setLikeCount] = useState(blog.likes);
  const increaseLike = async () => {
    const updatedLikeBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likeCount + 1,
      user: blog.user.id,
      id: blog.id,
    };
    await blogService.updateBlog(updatedLikeBlog, credentials.token);
    setLikeCount(likeCount + 1);
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog({ blog, token: credentials.token });
      navigate("/");
    }
  };

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <>
        <br />
        {blog.url}
        <br />
        likes {likeCount} <button onClick={increaseLike}>like</button>
        <br />
        {blog.user.username}
        <br />
        {blog.user.username === credentials.user.username && (
          <button onClick={removeBlog}>remove</button>
        )}
      </>
    </>
  );
};

export default BlogDetail;
