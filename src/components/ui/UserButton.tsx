import React from 'react';
import { FiUser } from 'react-icons/fi';

interface UserButtonProps {
  username?: string;
  onClick: () => void;
}

export const UserButton: React.FC<UserButtonProps> = ({ username, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      <FiUser size={18} />
      <span className="text-sm">{username || 'User'}</span>
    </button>
  );
};