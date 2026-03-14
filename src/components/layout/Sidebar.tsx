import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import { useAuth } from '../../contexts/AuthContext';
import { FiPlus, FiLogOut, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

export const Sidebar: React.FC = () => {
  const { conversations, loadConversation, deleteConversation, clearCurrentConversation } = useChatStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNewChat = () => {
    clearCurrentConversation();
    navigate('/chat');
  };

  const handleConversationClick = (id: string) => {
    loadConversation(id);
    navigate(`/chat/${id}`);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(id);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <FiPlus size={20} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <FiMessageSquare size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs mt-1">Start a new chat to begin</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleConversationClick(conversation.id)}
              className="p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800 group relative transition-colors duration-200"
            >
              {/* Conversation title */}
              <div className="font-medium truncate pr-8">
                {conversation.title || 'New Conversation'}
              </div>
              
              {/* Timestamp */}
              <div className="text-xs text-gray-400 mt-1">
                {formatDistanceToNow(new Date(conversation.updated_at), { 
                  addSuffix: true 
                })}
              </div>
              
              {/* Delete button - appears on hover */}
              <button
                onClick={(e) => handleDelete(e, conversation.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all duration-200"
                title="Delete conversation"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* User Info Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          {/* User avatar and info */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{user?.email}</div>
              <div className="text-xs text-gray-400">
                {user?.credits || 0} credits
              </div>
            </div>
          </div>
          
          {/* Logout button */}
          <button
            onClick={logout}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 flex-shrink-0"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};