import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useMessageContext } from '../context/userMessage';
import Chatcontainer from '../components/Chatcontainer';

function Homepage() {
  const { selectedUSER } = useMessageContext();

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Navbar param={"profile"}/>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          {selectedUSER ? (
            <Chatcontainer />
          ) : (
            <div className="text-gray-500 text-lg">Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;