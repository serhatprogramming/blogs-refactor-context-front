import React, { useState } from "react";
// components
import Notification from "./Notification";
// services
import loginService from "../services/login";
// context
import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import CredentialsContext from "../CredentialsContext";
//======================================================//
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //======================================================//
  // contexts for notification and credentials
  //======================================================//
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  //======================================================//
  const postNotification = ({ type, payload }) => {
    notificationDispatch({ type, payload });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 3000);
  };
  //======================================================//
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await loginService.login(username, password);
      credentialsDispatch({ type: "LOGIN", payload: loggedUser });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
    } catch (error) {
      postNotification({
        type: "WARNING",
        payload: "Wrong Credentials",
      });
    }
  };
  //======================================================//

  return (
    <div>
      <h3>login to application</h3>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button">login</button>
      </form>
    </div>
  );
};

export default Login;
