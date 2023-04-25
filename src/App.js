import { useState, useEffect, useRef } from "react";
//components
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
//services
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  //======================================================//
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

  const showLogin = ({
    notification,
    handleLogin,
    username,
    password,
    setPassword,
    setUsername,
  }) => (
    <Login
      notification={notification}
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      setPassword={setPassword}
      password={password}
    />
  );
  //======================================================//

  const showBlogs = ({
    notification,
    user,
    handleLogout,
    createNewBlog,
    token,
  }) => (
    <Blogs
      notification={notification}
      user={user}
      handleLogout={handleLogout}
      createNewBlog={createNewBlog}
      token={token}
    />
  );
  //======================================================//

  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisible();
    const newBlog = {
      title,
      author,
      url,
      user: user.id,
    };
    let message = "";
    const response = await blogService.createNew(newBlog, token);
    if (response === "Request failed with status code 400") {
      message = {
        content: `Fill out all the fields.`,
        style: "error",
      };
    } else {
      message = {
        content: `a new blog ${newBlog.title}! by ${newBlog.author} added`,
        style: "info",
      };
      const returnedBlogs = await blogService.getAll(token);
      setBlogs(returnedBlogs);
    }
    showNotification(message);
  };
  //======================================================//

  const createNewBlog = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  );
  //======================================================//

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await loginService.login(username, password);
      setUser(loggedUser);
      const returnedToken = loginService.setToken(loggedUser.token);
      setToken(returnedToken);
      const returnedBlogs = await blogService.getAll(returnedToken);
      setBlogs(returnedBlogs);
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
      {user
        ? showBlogs({ notification, user, handleLogout, createNewBlog, token })
        : showLogin({
            notification,
            handleLogin,
            username,
            password,
            setPassword,
            setUsername,
          })}
    </>
  );
};

export default App;
