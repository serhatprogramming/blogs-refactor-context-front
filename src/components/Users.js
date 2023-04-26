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
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>blogs created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
