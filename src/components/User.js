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
      <div>{true ? `Merhaba ${id} ${user.username}` : `nope`}</div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.id}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
