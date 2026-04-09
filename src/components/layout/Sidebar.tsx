import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiPlus, FiTrash2, FiMessageSquare, FiSun, FiMoon, FiSidebar } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '../../hooks/useToast';
import { LogOut } from 'lucide-react';
import { SidebarHeader } from '../ui/SidebarHeader';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { conversations, loadConversation, deleteConversation, clearCurrentConversation } = useChatStore();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { showSuccess } = useToast();

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

  const handleLogout = () => {
    const username = user?.username || user?.email || 'User';
    logout();
    showSuccess(`You are logged out successfully! See you soon ${username}!`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        onToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  return (
    <>
      {/* Collapsed Sidebar - Only logo and toggle button */}
      {!isOpen && (
        <div className="w-16 bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] border-r border-white/10 h-screen flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h1 className="text-xl font-bold tracking-wide text-center">
              Z<span className="text-[rgb(var(--color-primary))]">A</span>
            </h1>
          </div>
          <button
            onClick={onToggle}
            className="p-2 mx-auto mt-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            title="Expand sidebar"
          >
            <FiSidebar size={20} className="rotate-180" />
          </button>
        </div>
      )}

      {/* Expanded Sidebar - Full content */}
      {isOpen && (
        <div className="w-64 bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] border-r border-white/10 h-screen flex flex-col">
          {/* Header with Logo and Toggle */}
          <SidebarHeader isOpen={isOpen} onToggle={onToggle} />

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 bg-[rgb(var(--color-primary))] text-white rounded-xl p-3 hover:opacity-90 transition"
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
                  className="relative group p-3 mx-2 my-1 cursor-pointer rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200"
                >
                  <div className="font-medium truncate pr-8">
                    {conversation.title || 'New Conversation'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(conversation.updated_at), { 
                      addSuffix: true 
                    })}
                  </div>
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
          <div className="p-4 border-t border-white/10">
            {/* Theme Toggle Button */}
            <div className="flex justify-center mb-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <>
                    <FiMoon size={16} />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <FiSun size={16} />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* User info and logout */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 bg-[rgb(var(--color-primary))] rounded-full flex items-center justify-center flex-shrink-0">
                  {user?.email?.[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{user?.email}</div>
                  <div className="text-xs text-gray-400">
                    {user?.credits || 0} credits
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 flex-shrink-0"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};