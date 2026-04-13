import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';
import { Sidebar } from '../components/layout/Sidebar';
import { ChatWindow } from '../components/layout/ChatWindow';
import { ChatInput } from '../components/chat/ChatInput';


export const Chat: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  
  const { 
    currentConversation,
    isDraft, 
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

 if (!currentConversation || isDraft) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <div className="text-center max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">
          What's on your mind?
        </h2>

        <p className="opacity-60 mb-6">
          Ask anything about your code — debugging, optimization, best practices
        </p>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isSending}
        />
      </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex-1 overflow-auto">
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