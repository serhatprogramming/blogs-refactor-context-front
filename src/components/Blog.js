import { useState } from "react";

import blogService from "../services/blogs";

// Link from router
import { Link } from "react-router-dom";

const Blog = ({ blog, token, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogContent">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
