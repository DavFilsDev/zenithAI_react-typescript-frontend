import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import { ChatWindow } from '../components/chat/ChatWindow';
// import { Sidebar } from '../components/layout/Sidebar'; // We'll create this next

export const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { 
    currentConversation, 
    sendMessage, 
    loadConversation,
    isLoading,
    isSending 
  } = useChat();

  useEffect(() => {
    if (id) {
      loadConversation(id);
    }
  }, [id]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - will be created in next phase */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Conversations</h2>
          <p className="text-sm text-gray-400 mt-2">Sidebar coming soon...</p>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1">
        <ChatWindow
          messages={currentConversation?.messages || []}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          isSending={isSending}
          disabled={!currentConversation && isLoading}
        />
      </div>
    </div>
  );
};