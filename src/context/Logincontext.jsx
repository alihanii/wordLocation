import { createContext, useContext, useReducer } from "react";

const LoginC = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function Logincontext({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <LoginC.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </LoginC.Provider>
  );
}

function useLoginC() {
  const context = useContext(LoginC);
  if (context === undefined)
    throw new Error("LoginC was used outside Logincontext");
  return context;
}

export { Logincontext, useLoginC };
