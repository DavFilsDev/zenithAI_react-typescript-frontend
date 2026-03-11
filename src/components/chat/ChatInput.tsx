import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-white">
      {/* Message input textarea */}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Please wait..." : "Type your message..."}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        style={{ 
          minHeight: '44px', 
          maxHeight: '120px',
          overflowY: 'auto' 
        }}
      />
      
      {/* Send button */}
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        title="Send message (Enter)"
      >
        <IoSend size={20} />
      </button>
    </form>
  );
};