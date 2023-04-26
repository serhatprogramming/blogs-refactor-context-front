import { useEffect } from "react";
//components
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
import BlogDetail from "./components/BlogDetail";
import Menu from "./components/Menu";
// context
import { useContext } from "react";
import CredentialsContext from "./CredentialsContext";
// routes and Links
import { Routes, Route, Link, Navigate } from "react-router-dom";

const App = () => {
  //======================================================//
  // initialization of credentials
  // contexts for credentials
  //======================================================//
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  //======================================================//
  useEffect(() => {
    const userLocalStorage = JSON.parse(
      window.localStorage.getItem("loggedBlogUser")
    );
    if (userLocalStorage) {
      credentialsDispatch({ type: "LOGIN", payload: userLocalStorage });
    }
  }, []);
  //======================================================//
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={credentials ? <Blogs /> : <Login />} />
        <Route
          path="/users"
          element={credentials ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </>
  );
};

export default App;
