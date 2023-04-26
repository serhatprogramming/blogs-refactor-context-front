import React from "react";
// components
import UserInfo from "./UserInfo";
// services
import userService from "../services/users";
// context
import { useContext } from "react";
import UsersContext from "../UsersContext";
import CredentialsContext from "../CredentialsContext";
// react-query
import { useQuery } from "react-query";
// routing
import { Link } from "react-router-dom";

const Users = () => {
  //======================================================//
  // contexts for credentials
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  const [users, usersDispatch] = useContext(UsersContext);
  //======================================================//
  const userQuery = useQuery(
    "users",
    async () => await userService.getAll(credentials.token)
  );
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }
  usersDispatch({ type: "GETUSERS", payload: userQuery.data });

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
                    <td>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </td>
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
