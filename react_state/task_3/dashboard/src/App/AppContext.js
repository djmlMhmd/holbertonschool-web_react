import React from "react";

const userLogout = {
  email: "",
  password: "",
  isLoggedIn: false,
};

const logoutUser = () => {};

const AppContext = React.createContext({
  user: userLogout,
  logOut: logoutUser,
});

export { AppContext, logoutUser, userLogout };
