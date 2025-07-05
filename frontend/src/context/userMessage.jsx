import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { apiInstance } from "../lib/axios";
import { useUserContext } from "./userAuth";

const MessageContext = createContext({
    messages: [],
    users: [],
    selectedUSER: null,
    isUserLoading: false,
    isMessageLoading: false,
    getUsers: async () => { }
});

export const MessageContextProvider = ({ children }) => {
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUSER, setSelectedUSER] = useState(null);
    const {socket,authUser}=useUserContext()

    useEffect(() => {
  console.log("🧪 socket from user context:", socket);
  console.log("🧪 authUser:", authUser);
}, [socket, authUser]);
    
    const getUsers = async () => {
        setIsUserLoading(true);
        try {
            const response = await apiInstance.get("/message/users");
            setUsers(response.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch users");
            console.log(error);
        } finally {
            setIsUserLoading(false);
        }
    };

    const getMessages = async (userId) => {
        setIsMessageLoading(true);
        try {
            const response = await apiInstance.get(`/message/${userId}`);
            setMessages(response.data);
        } finally {
            setIsMessageLoading(false);
        }
    };

    const sendMessage = async (userId, data) => {
        try {
            await apiInstance.post(`/message/send/${userId}`, data);
            await getMessages(selectedUSER._id);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send message");
        }
    };
    const realTimeMessages = () => {
  if (!selectedUSER) return;

     socket.off("newMessage"); // Prevent duplicate listeners

    socket.on("newMessage", (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });
    };

    return (
        <MessageContext.Provider value={{
            sendMessage,
            setSelectedUSER,
            getMessages,
            isUserLoading,
            getUsers,
            isMessageLoading,
            messages,
            users,
            selectedUSER,
            realTimeMessages
        }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => useContext(MessageContext);