import React from "react";
// context
import { useContext } from "react";
import CredentialsContext from "../CredentialsContext";

const UserInfo = () => {
  //======================================================//
  // contexts for credentials
  //======================================================//
  const [credentials, credentialsDispatch] = useContext(CredentialsContext);
  //======================================================//
  const handleLogout = () => {
    window.localStorage.clear();
    credentialsDispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <em>
        {`${credentials.user.username} is logged in`}{" "}
        <button onClick={handleLogout}>logout</button>{" "}
      </em>
    </>
  );
};

export default UserInfo;
