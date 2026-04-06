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
            ? 'bg-[rgb(var(--color-primary))] text-white'
            : 'bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10'
        }`}
      >
        
        {/* Message content - different rendering based on sender */}
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                code: ({ children }) => <code className="bg-gray-300 rounded px-1">{children}</code>,
                pre: ({ children }) => <pre className="bg-gray-300 rounded p-2 overflow-x-auto">{children}</pre>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
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