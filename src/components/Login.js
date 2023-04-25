import React from "react";
// components
import Notification from "./Notification";

const Login = ({
  notification,
  handleLogin,
  username,
  password,
  setPassword,
  setUsername,
}) => {
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
