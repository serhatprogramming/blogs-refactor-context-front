import React from "react";
import { useParams } from "react-router";
// context
import { useContext } from "react";
import UsersContext from "../UsersContext";

const User = () => {
  const id = useParams().id;
  //======================================================//
  // contexts for credentials
  const [users, usersDispatch] = useContext(UsersContext);
  //======================================================//
  const user = users.find((user) => user.id == id);

  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>No blogs created yet.</p>
      )}
    </>
  );
};

export default User;
