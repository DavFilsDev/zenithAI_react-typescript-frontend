import { useState, useEffect } from 'react';
import { chatService } from '../services/chat';
import type { Conversation, Message } from '../types/chat';
import toast from 'react-hot-toast';

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const data = await chatService.getConversations();
      setConversations(data);
    } catch (error) {
      toast.error('Failed to load conversations');
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversation = async (id: string) => {
    try {
      setIsLoading(true);
      const data = await chatService.getConversation(id);
      setCurrentConversation(data);
    } catch (error) {
      toast.error('Failed to load conversation');
      console.error('Error loading conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      setIsSending(true);
      
      const tempUserMessage: Message = {
        id: Date.now().toString(),
        conversation: currentConversation?.id || '',
        role: 'user',
        content,
        created_at: new Date().toISOString(),
      };

      if (currentConversation) {
        setCurrentConversation({
          ...currentConversation,
          messages: [...currentConversation.messages, tempUserMessage],
        });
      }

      const response = await chatService.sendMessage({
        message: content,
        conversation_id: currentConversation?.id,
      });

      if (response.role === 'assistant') {
        setCurrentConversation(prev => {
          if (!prev) return prev;
          
          const messagesWithoutTemp = prev.messages.filter(
            msg => msg.id !== tempUserMessage.id
          );
          
          return {
            ...prev,
            messages: [...messagesWithoutTemp, response],
          };
        });
      }

      loadConversations();
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
      
      if (currentConversation) {
        loadConversation(currentConversation.id);
      }
    } finally {
      setIsSending(false);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await chatService.deleteConversation(id);
      
      setConversations(prev => prev.filter(c => c.id !== id));
      
      if (currentConversation?.id === id) {
        setCurrentConversation(null);
      }
      
      toast.success('Conversation deleted');
    } catch (error) {
      toast.error('Failed to delete conversation');
      console.error('Error deleting conversation:', error);
    }
  };

  return {
    conversations,
    currentConversation,
    isLoading,
    isSending,
    loadConversations,
    loadConversation, 
    sendMessage,
    deleteConversation,
  };
};