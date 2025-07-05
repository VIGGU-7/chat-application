import { createContext, useContext } from "react";
import { apiInstance } from "../lib/axios";

export const userContext = createContext({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingIn: false,
  isCheckingauth: true,
  checkAuth: async () => {}, // dummy default
  socket:null,
});

export const UserContextProvider = userContext.Provider;

export const useUserContext = () => useContext(userContext);
