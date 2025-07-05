import React from 'react';
import { useMessageContext } from '../context/userMessage';
import md5 from 'md5';

function Chatheader() {
  const { selectedUSER } = useMessageContext();
  const hash = md5(selectedUSER.email);

  return (
    <div className="bg-neutral-800 px-4 py-3 flex items-center gap-3 border-b border-neutral-700">
      <img
        src={selectedUSER.profilePIC || `https://www.gravatar.com/avatar/${hash}?s=40&d=identicon`}
        className="w-10 h-10 rounded-full"
        alt="avatar"
      />
      <div className="text-white font-medium text-sm">{selectedUSER.fullName}</div>
    </div>
  );
}

export default Chatheader;