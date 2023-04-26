import React from "react";
// context
import { useContext } from "react";
import CredentialsContext from "../CredentialsContext";
// routes and Links
import { Link } from "react-router-dom";
// components
import UserInfo from "./UserInfo";

const Menu = () => {
  //======================================================//
  // initialization of credentials
  // contexts for credentials
  //======================================================//
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  //======================================================//

  const padding = { padding: 5 };
  return (
    <div style={{ backgroundColor: "lightgray", padding: 5 }}>
      <Link to="/" style={padding}>
        home
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {credentials ? (
        <UserInfo />
      ) : (
        <Link to="/login" style={padding}>
          login
        </Link>
      )}
    </div>
  );
};

export default Menu;
