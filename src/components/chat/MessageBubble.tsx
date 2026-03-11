import React from 'react';
import type { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      
      {/* Message bubble with dynamic colors */}
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        
        {/* Message content - different rendering based on sender */}
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <ReactMarkdown 
            className="prose prose-sm max-w-none"
            // pros: Adds nice typography styles
          >
            {message.content}
          </ReactMarkdown>
        )}
        
        {/* Timestamp */}
        <span className={`text-xs mt-1 block ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {new Date(message.created_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};