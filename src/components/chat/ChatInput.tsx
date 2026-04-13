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
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
      <div className="
        relative flex items-end
        rounded-2xl px-3 py-2
        bg-white/10 dark:bg-white/5
        backdrop-blur-md
        border border-white/20 dark:border-white/10
        focus-within:ring-2 focus-within:ring-[rgb(var(--color-primary))]
      ">
        
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Please wait..." : "What's on your mind?"}
          disabled={disabled}
          rows={1}
          className="
            flex-1 resize-none bg-transparent
            text-[rgb(var(--color-text))]
            outline-none
            placeholder:opacity-60
            pr-10   /* space for button */
          "
          style={{
            minHeight: '24px',
            maxHeight: '120px',
            overflow: 'hidden'
          }}
        />

        {/* Send Button */}
   <button
      type="submit"
      disabled={disabled || !message.trim()}
      className="
        absolute right-1 bottom-1
        p-2 rounded-xl

        bg-white/10 dark:bg-white/5
        backdrop-blur-md
        border border-white/20 dark:border-white/10

        text-[rgb(var(--color-primary))]

        hover:bg-white/20 dark:hover:bg-white/10
        transition-all duration-200

        disabled:opacity-40
        flex items-center justify-center
      "
    >
      <IoSend size={18} />
    </button>

      </div>
    </form>
  );
};