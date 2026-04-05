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
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Chat
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