import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';
import { Sidebar } from '../components/layout/Sidebar';
import { ChatWindow } from '../components/layout/ChatWindow';
import { FiMessageSquare } from 'react-icons/fi';

export const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { 
    currentConversation, 
    loadConversation, 
    sendMessage, 
    isSending,
    isLoading,
    clearCurrentConversation
  } = useChatStore();

  useEffect(() => {
    if (id) {
      loadConversation(id);
    } else {
      clearCurrentConversation();
    }
  }, [id, loadConversation, clearCurrentConversation]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content, currentConversation?.id);
  };

  if (!currentConversation) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-8">
            <FiMessageSquare size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Conversation Selected
            </h2>
            <p className="text-gray-500 mb-4">
              Select a conversation from the sidebar or start a new one to begin chatting with the AI.
            </p>
            <button
              onClick={() => window.location.href = '/chat'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start New Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar with conversation list */}
      <Sidebar />
      
      {/* Main chat area using our ChatWindow component */}
      <div className="flex-1">
        <ChatWindow
          messages={currentConversation.messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isSending={isSending}
          disabled={isSending}
        />
      </div>
    </div>
  );
};