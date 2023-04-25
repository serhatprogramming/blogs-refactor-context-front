import { useState, useEffect } from "react";
//components
import Blogs from "./components/Blogs";
import Login from "./components/Login";
//services
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const userLocalStorage = JSON.parse(
      window.localStorage.getItem("loggedBlogUser")
    );
    if (userLocalStorage) {
      setUser(userLocalStorage);
      const returnedToken = loginService.setToken(userLocalStorage.token);
      setToken(returnedToken);
    }
  }, []);

  //======================================================//

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await loginService.login(username, password);
      setUser(loggedUser);
      const returnedToken = loginService.setToken(loggedUser.token);
      setToken(returnedToken);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
    } catch (error) {
      const message = {
        content: `Wrong Credentials.`,
        style: "error",
      };
      showNotification(message);
    }
  };
  //======================================================//

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };
  //======================================================//

  const showNotification = (message) => {
    setNotification({
      notification: message.content,
      notificationStyle: message.style,
    });
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };
  //======================================================//

  return (
    <>
      {user ? (
        <Blogs
          notification={notification}
          user={user}
          handleLogout={handleLogout}
          token={token}
        />
      ) : (
        <Login
          notification={notification}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        />
      )}
    </>
  );
};

export default App;
