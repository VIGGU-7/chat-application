import { useState, useEffect } from "react";
import { UserContextProvider } from "./userAuth";
import { apiInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdatingIn, setIsUpdatingIn] = useState(false);
  const [isCheckingauth, setIsCheckingauth] = useState(true);
  const BASE_URL = "http://localhost:8080";
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      console.log("✅ Socket instance created:", socket);
    }
  }, [socket]);

  // ✅ Connect socket when authUser is set
  useEffect(() => {
    if (authUser && !socket) {
      connectSocket();
    }
  }, [authUser]);

  const checkAuth = async () => {
    try {
      const res = await apiInstance.get("/auth/check");
      setAuthUser(res.data); // triggers connectSocket via useEffect
    } catch (error) {
      setAuthUser(null);
    } finally {
      setIsCheckingauth(false);
    }
  };

  const Login = async (email, password) => {
    try {
      const res = await apiInstance.post("/auth/login", { email, password });
      toast.success("Login successful");
      setAuthUser(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.log(error);
    }
  };

  const Signup = async (fullName, email, password) => {
    try {
      const response = await apiInstance.post("/auth/signup", {
        fullName,
        email,
        password,
      });
      toast.success("Registered successfully");
      setAuthUser(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  const Logout = async () => {
    try {
      await apiInstance.post("/auth/logout");
      toast.success("Logged out successfully");
      setAuthUser(null);
      disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await apiInstance.put("/auth/update-profile", data);
      setAuthUser(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed");
    }
  };

  const connectSocket = () => {
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    newSocket.on("connect", () => {
      console.log("🔌 Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    // ✅ Now add listener here!
    newSocket.on("onlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    setSocket(newSocket); // ✅ Must be last
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("🔌 Socket manually disconnected");
    }
  };

  return (
    <UserContextProvider
      value={{
        disconnectSocket,
        connectSocket,
        authUser,
        setAuthUser,
        Login,
        updateProfile,
        Logout,
        Signup,
        socket,
        isSigningUp,
        isLoggingIn,
        isUpdatingIn,
        isCheckingauth,
        checkAuth,
        setIsSigningUp,
        setIsLoggingIn,
        setIsUpdatingIn,
        onlineUsers,
      }}
    >
      {children}
    </UserContextProvider>
  );
};
