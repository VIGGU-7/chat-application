import React, { useEffect } from 'react';
import { useMessageContext } from '../context/userMessage';
import { Loader } from 'lucide-react';
import md5 from 'md5';
import { FaUserFriends } from 'react-icons/fa';
import { useUserContext } from '../context/userAuth';

function Sidebar() {
  const {
    setSelectedUSER,
    isUserLoading,
    getUsers,
    users,
    selectedUSER,
  } = useMessageContext();
  const {onlineUsers}=useUserContext()

  useEffect(() => {
    getUsers();
  }, []);

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center w-64 h-full bg-gray-900">
        <Loader className="animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <aside className="w-18 sm:w-64 bg-gray-900 h-full border-r border-gray-800 flex flex-col">
      <div className="hidden sm:p-4 border-b border-gray-800 text-white font-semibold text-lg flex items-center gap-2">
        <FaUserFriends className="hidden sm: text-blue-400" />
        Users
      </div>
      <ul className="overflow-y-auto flex-1">
        {users.length === 0 && (
          <li className="p-4 text-gray-500 text-center">No users found</li>
        )}
        {users.map((user) => {
          const hash = md5(user.email || "");
          return (
            <li
              key={user._id}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition hover:bg-gray-800
              ${selectedUSER?._id === user._id ? 'bg-gray-800' : ''}`}
              onClick={() => setSelectedUSER(user)}
            >
              <img
                src={
                  user.profilePic ||
                  `https://www.gravatar.com/avatar/${hash}?s=40&d=identicon`
                }
                alt={user.fullName}
                className="sm:w-10 h-10 rounded-full object-cover border border-gray-700"
              />
              <div>
                <span className="hidden sm:block text-white text-sm font-medium">{user.fullName}</span>
              <span className={`text-sm hidden sm:block ${onlineUsers.includes(user._id)? "text-green-400": "text-red-400"}`}>{onlineUsers.includes(user._id) ? "online":"offline"}</span>
              </div>
              
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;