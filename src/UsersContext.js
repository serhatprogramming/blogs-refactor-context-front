import { createContext, useReducer } from "react";

const usersReducer = (state, action) => {
  switch (action.type) {
    case "GETUSERS":
      return action.payload;
    case "ERASEUSERS":
      return null;
    default:
      return state;
  }
};

const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [users, usersDispatch] = useReducer(usersReducer, null);

  return (
    <UsersContext.Provider value={[users, usersDispatch]}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
