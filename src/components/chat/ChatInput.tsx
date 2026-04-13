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
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-white/10 dark:bg-white/5">
      {/* Message input textarea */}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Please wait..." : "Type your message..."}
        disabled={disabled}
        rows={1}
        className="
          flex-1 resize-none rounded-xl p-3
          bg-white/10 dark:bg-white/5
          text-[rgb(var(--color-text))] 
          border border-white/20 dark:border-white/10
          backdrop-blur-md
          focus:outline-none
          focus:ring-2 focus:ring-[rgb(var(--color-primary))]
          disabled:opacity-50
          overflow-hidden 
        "
        style={{ 
          minHeight: '44px', 
          maxHeight: '120px'
        }}
      />
      
      {/* Send button */}
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="
          p-3 rounded-xl
          bg-[rgb(var(--color-primary))]
          text-white
          hover:opacity-90
          transition
          flex items-center justify-center
          hover:scale-105 active:scale-95
        "
        title="Send message (Enter)"
      >
        <IoSend size={20} />
      </button>
    </form>
  );
};