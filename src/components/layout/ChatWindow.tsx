import React from 'react';
import type { Message } from '../../types/chat';
import { MessageList } from '../chat/MessageList';
import { ChatInput } from '../chat/ChatInput';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  isSending?: boolean;
  disabled?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isLoading,
  isSending,
  disabled,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[rgb(var(--color-bg))]">
      
      <div className="
        p-4 border-b
        bg-white/10 dark:bg-white/5
        backdrop-blur-md
        border-white/10
      ">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="font-semibold text-[rgb(var(--color-text))]">
            Zenith<span className="text-[rgb(var(--color-primary))]">AI</span> Chat
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="max-w-3xl mx-auto w-full h-full px-4">
          <MessageList 
            messages={messages} 
            isLoading={isLoading}
            isSending={isSending}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-3xl mx-auto w-full px-4">
          <ChatInput 
            onSendMessage={onSendMessage} 
            disabled={disabled || isSending}
          />
        </div>
      </div>

    </div>
  );
};