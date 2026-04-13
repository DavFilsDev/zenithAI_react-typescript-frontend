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
      {/* Header */}
      <div className="
        p-4 border-b
        bg-white/10 dark:bg-white/5
        backdrop-blur-md
        border-white/10
      ">
        <h2 className="font-semibold text-[rgb(var(--color-text))]">
          Zenith<span className="text-[rgb(var(--color-primary))]">AI</span> Chat
        </h2>
      </div>

      {/* Message list - takes all available space */}
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages} 
          isLoading={isLoading}
          isSending={isSending}
        />
      </div>

      {/* Input area - fixed at bottom */}
      <ChatInput 
        onSendMessage={onSendMessage} 
        disabled={disabled || isSending}
      />
    </div>
  );
};