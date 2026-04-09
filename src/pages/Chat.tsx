import React, { useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';
import { Sidebar } from '../components/layout/Sidebar';
import { ChatWindow } from '../components/layout/ChatWindow';
import { FiMessageSquare } from 'react-icons/fi';

export const Chat: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-8
            bg-white/10 dark:bg-white/5
            backdrop-blur-md border border-white/20 dark:border-white/10
            rounded-2xl shadow-xl">

            <FiMessageSquare className="mx-auto mb-4 opacity-50" size={48} />

            <h2 className="text-xl font-semibold mb-2">
              No conversation selected
            </h2>

            <p className="opacity-70 mb-4">
              Start a new chat to begin with ZenithAI
            </p>

            <button className="
              px-5 py-2 rounded-xl
              bg-[rgb(var(--color-primary))]
              text-white
              hover:opacity-90 transition
            ">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
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