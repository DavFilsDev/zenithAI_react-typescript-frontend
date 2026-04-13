import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Conversation, Message } from '../types/chat';
import { chatService } from '../services/chat';
import toast from 'react-hot-toast';

interface ChatState {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    isLoading: boolean;
    isSending: boolean;
    isDraft: boolean;
    
    setConversations: (conversations: Conversation[]) => void;
    setCurrentConversation: (conversation: Conversation | null) => void;
    addMessage: (message: Message) => void;
    loadConversations: () => Promise<void>;
    loadConversation: (id: string) => Promise<void>;
    sendMessage: (content: string, conversationId?: string) => Promise<void>;
    deleteConversation: (id: string) => Promise<void>;
    clearCurrentConversation: () => void;
    startNewChat: () => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            currentConversation: null,
            isLoading: false,
            isSending: false,
            isDraft: false,

            setConversations: (conversations) => set({ conversations }),
        
            setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
        
            addMessage: (message) => {
                const { currentConversation } = get();
                if (currentConversation) {
                set({
                    currentConversation: {
                        ...currentConversation,
                        messages: [...currentConversation.messages, message],
                    },
                });
                }
            },

            clearCurrentConversation: () => set({ 
                currentConversation: null,
                isDraft: false,
            }),

            loadConversations: async () => {
                set({ isLoading: true });
                try {
                    const data = await chatService.getConversations();
                    set({ conversations: data });
                } catch (error) {
                    console.error('Failed to load conversations:', error);
                    toast.error('Failed to load conversations');
                } finally {
                    set({ isLoading: false });
                }
            },

            loadConversation: async (id) => {
                set({ isLoading: true });
                try {
                    const data = await chatService.getConversation(id);
                    set({ currentConversation: data });
                } catch (error) {
                    console.error('Failed to load conversation:', error);
                    toast.error('Failed to load conversation');
                } finally {
                    set({ isLoading: false });
                }
            },

            sendMessage: async (content, conversationId) => {
                const { currentConversation, addMessage } = get();
                
                if (!content.trim()) return;
                
                set({ isSending: true });

                const tempMessage: Message = {
                    id: `temp-${Date.now()}`,
                    conversation: currentConversation?.id || '',
                    role: 'user',
                    content,
                    created_at: new Date().toISOString(),
                };
                
                addMessage(tempMessage);

                try {
                    const response = await chatService.sendMessage({
                        message: content,
                        conversation_id: conversationId || currentConversation?.id,
                    });

                    if (response.role === 'assistant') {
                        const { currentConversation } = get();
                        if (currentConversation) {
                            const messagesWithoutTemp = currentConversation.messages.filter(
                                msg => msg.id !== tempMessage.id
                            );
                            set({
                                currentConversation: {
                                ...currentConversation,
                                messages: [...messagesWithoutTemp, response],
                                },
                            });
                        }
                    }

                    get().loadConversations();
                    
                    toast.success('Message sent!');
                } catch (error) {
                console.error('Failed to send message:', error);
                toast.error('Failed to send message');
                
                if (currentConversation) {
                    get().loadConversation(currentConversation.id);
                }
                } finally {
                    set({ isSending: false });
                }
            },

            deleteConversation: async (id) => {
                try {
                    await chatService.deleteConversation(id);
                    
                    set((state) => ({
                        conversations: state.conversations.filter((c) => c.id !== id),
                        currentConversation: state.currentConversation?.id === id ? null : state.currentConversation,
                    }));
                    
                    toast.success('Conversation deleted');
                } catch (error) {
                    console.error('Failed to delete conversation:', error);
                    toast.error('Failed to delete conversation');
                }
            },

            startNewChat: () => {
                set({
                    currentConversation: {
                    id: 'draft',
                    user: 'local',
                    title: '',
                    messages: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    },
                    isDraft: true,
                });
            },
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({
                conversations: state.conversations,
            }),
        }
    )
);