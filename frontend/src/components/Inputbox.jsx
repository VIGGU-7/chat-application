import React, { useState, useRef } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { IoSendOutline } from 'react-icons/io5';
import { useMessageContext } from '../context/userMessage';

function Inputbox() {
  const [message, setMessage] = useState('');
  const { selectedUSER, sendMessage } = useMessageContext();
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!selectedUSER) return;

    const trimmed = message.trim();
    if (trimmed) {
      sendMessage(selectedUSER._id, { text: trimmed });
      setMessage('');
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedUSER) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      sendMessage(selectedUSER._id, { image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-neutral-800 px-4 py-3 border-t border-neutral-700">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="text-blue-400 hover:bg-neutral-700 p-2 rounded-full"
          onClick={handleImageClick}
          title="Attach image"
        >
          <CiImageOn className="w-5 h-5" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <input
          type="text"
          className="flex-1 bg-neutral-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          onClick={handleSend}
          title="Send"
        >
          <IoSendOutline className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Inputbox;
