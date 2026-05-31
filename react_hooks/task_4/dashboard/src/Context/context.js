import { createContext } from 'react';

export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const defaultLogOut = () => { };

export const newContext = createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});
