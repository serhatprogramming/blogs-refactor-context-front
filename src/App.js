import { useEffect } from "react";
//components
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
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
  const padding = { padding: 5 };
  return (
    <>
      <div>
        <Link to="/" style={padding}>
          home
        </Link>
        <Link to="/users" style={padding}>
          users
        </Link>
        {credentials ? (
          <p>
            Hello <em>{credentials.user.username}</em>{" "}
          </p>
        ) : (
          <Link to="/login" style={padding}>
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={credentials ? <Blogs /> : <Login />} />
        <Route
          path="/users"
          element={credentials ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  );
};

export default App;
