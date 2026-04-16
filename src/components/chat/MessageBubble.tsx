import React from 'react';
import type { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';
import { Copy, Pencil } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      
      {/* GROUP for hover */}
      <div className="group max-w-[70%]">
        
        {/* Message bubble */}
        <div
          className={`rounded-xl p-4 ${
            isUser
              ? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-text))] border border-[rgb(var(--color-primary))]/20 backdrop-blur-md'
              : 'bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          <span className="text-xs mt-2 block opacity-60">
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {/* ACTION BUTTONS (only user) */}
        {isUser && (
          <div className="
            flex gap-2 mt-2 justify-end
            opacity-50 group-hover:opacity-100
            transition
          ">
            
            {/* Copy */}
            <button
              onClick={handleCopy}
              className="
                p-1.5 rounded-lg
                bg-white/10 dark:bg-white/5
                border border-white/10
                hover:bg-white/20
                transition
              "
            >
              <Copy size={16} />
            </button>

            {/* Edit */}
            <button
              className="
                p-1.5 rounded-lg
                bg-white/10 dark:bg-white/5
                border border-white/10
                hover:bg-white/20
                transition
              "
            >
              <Pencil size={16} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};