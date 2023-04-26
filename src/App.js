import { useEffect } from "react";
//components
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Users from "./components/Users";
// context
import { useContext } from "react";
import CredentialsContext from "./CredentialsContext";
// routes and Links
import { Routes, Route, Link } from "react-router-dom";

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
        <Link to="/login" style={padding}>
          login
        </Link>
      </div>

      <Routes>
        <Route path="/" element={credentials ? <Blogs /> : <Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
