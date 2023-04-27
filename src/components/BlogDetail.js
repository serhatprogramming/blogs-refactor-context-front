import React from "react";
import { useParams } from "react-router";
// context
import { useContext, useState } from "react";
import CredentialsContext from "../CredentialsContext";
import BlogsContext from "../BlogsContext";
// services
import blogService from "../services/blogs";
import commentService from "../services/comments";

// router
import { useNavigate } from "react-router";
// components
import CommentForm from "./CommentForm";

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
  const [comments, setComments] = useState(blog.comments);
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
    console.log(blog);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog({ blog, token: credentials.token });
      navigate("/");
    }
  };

  const addComment = (comment) => {
    commentService.addComment(blog.id, credentials.token, comment);
    setComments([...comments, { comment }]);
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
      <h3>comments</h3>
      <CommentForm addComment={addComment} />
      {comments.length > 0 ? (
        <ul>
          {comments.map((item) => (
            <li key={item.id}>{item.comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments...</p>
      )}
    </>
  );
};

export default BlogDetail;
