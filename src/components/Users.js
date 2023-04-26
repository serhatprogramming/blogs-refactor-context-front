import React from "react";
// components
import UserInfo from "./UserInfo";
// services
import userService from "../services/users";
// context
import { useContext, useEffect, useState } from "react";
import CredentialsContext from "../CredentialsContext";

const Users = () => {
  //======================================================//
  const [users, setUsers] = useState(null);
  //======================================================//
  // contexts for credentials
  //======================================================//
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  //======================================================//
  useEffect(() => {
    if (credentials !== null) {
      const callThem = async () => {
        const acquiredUsers = await userService.getAll(credentials.token);
        setUsers(acquiredUsers);
      };
      callThem();
    }
  }, [users]);

  return (
    <div>
      <UserInfo />
      <div>
        {users && (
          <div>
            <h3>Users</h3>
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
