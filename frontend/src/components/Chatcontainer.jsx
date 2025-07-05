import React, { useEffect, useRef } from 'react';
import { useMessageContext } from '../context/userMessage';
import { Loader } from 'lucide-react';
import Chatheader from './Chatheader';
import Inputbox from './Inputbox';

function Chatcontainer() {
  const { selectedUSER, getMessages, isMessageLoading, messages,realTimeMessages } = useMessageContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUSER?._id) 
      getMessages(selectedUSER._id);
    realTimeMessages()
    
  }, [selectedUSER?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-900">
      <Chatheader />
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-800">
        {isMessageLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin text-blue-400 w-8 h-8" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">No messages yet. Say hello!</div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={msg._id || idx}
              className={`flex ${msg.senderId === selectedUSER._id ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-4 py-2 max-w-sm text-sm rounded-2xl shadow-md whitespace-pre-line break-words
                ${msg.senderId === selectedUSER._id
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-white rounded-bl-none'}`}
              >
                {msg.text && <span>{msg.text}</span>}
                {msg.image && <img src={msg.image} alt="sent" className="mt-2 max-w-[180px] rounded-md" />}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <Inputbox />
    </div>
  );
}

export default Chatcontainer;