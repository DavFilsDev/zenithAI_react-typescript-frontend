import api from './api';
import type { Conversation, Message, ChatRequest } from '../types/chat';

export const chatService = {
  async getConversations(): Promise<Conversation[]> {
    const response = await api.get('/chat/conversations/');
    return response.data;
  },

  async getConversation(id: string): Promise<Conversation> {
    const response = await api.get(`/chat/conversations/${id}/`);
    return response.data;
  },

  async sendMessage(data: ChatRequest): Promise<Message> {
    const url = data.conversation_id 
      ? `/chat/chat/${data.conversation_id}/`
      : '/chat/chat/';
    
    const response = await api.post(url, { message: data.message });
    return response.data;
  },

  async deleteConversation(id: string): Promise<void> {
    await api.delete(`/chat/conversations/${id}/`);
  },
};