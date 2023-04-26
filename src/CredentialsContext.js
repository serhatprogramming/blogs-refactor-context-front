import { createContext, useReducer } from "react";

const credentialsReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, token: `Bearer ${action.payload.token}` };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

const CredentialsContext = createContext();

export const CredentialsContextProvider = (props) => {
  const [credentials, credentialsDispatch] = useReducer(
    credentialsReducer,
    null
  );

  return (
    <CredentialsContext.Provider value={[credentials, credentialsDispatch]}>
      {props.children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsContext;
