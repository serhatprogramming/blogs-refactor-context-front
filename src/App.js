import { useEffect } from "react";
//components
import Blogs from "./components/Blogs";
import Login from "./components/Login";
// context
import { useContext } from "react";
import CredentialsContext from "./CredentialsContext";

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

  return <>{credentials ? <Blogs /> : <Login />}</>;
};

export default App;
