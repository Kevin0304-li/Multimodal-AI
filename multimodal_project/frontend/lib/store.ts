import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the types for our state
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  media?: {
    type: string;
    url: string;
  } | null;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  notifications: boolean;
}

interface AppState {
  // User state
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null;
  
  // Conversations
  conversations: Conversation[];
  activeConversationId: string | null;
  
  // UI state
  isLoading: boolean;
  activeTab: string;
  isMobileMenuOpen: boolean;
  
  // User preferences
  preferences: UserPreferences;
  
  // Actions
  setUser: (user: AppState['user']) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  addConversation: (conversation: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>) => string;
  setActiveConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateConversationTitle: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
  clearConversations: () => void;
  setLoading: (isLoading: boolean) => void;
  setActiveTab: (tab: string) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  logout: () => void;
}

// Create the store
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      conversations: [],
      activeConversationId: null,
      isLoading: false,
      activeTab: 'multimodal',
      isMobileMenuOpen: false,
      preferences: {
        theme: 'system',
        fontSize: 'medium',
        language: 'en',
        notifications: true,
      },
      
      // Actions
      setUser: (user) => set({ user }),
      
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      addConversation: (conversation) => {
        const id = Math.random().toString(36).substring(2, 11);
        const now = new Date();
        
        const newConversation: Conversation = {
          id,
          ...conversation,
          createdAt: now,
          updatedAt: now,
        };
        
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          activeConversationId: id,
        }));
        
        return id;
      },
      
      setActiveConversation: (id) => set({ activeConversationId: id }),
      
      addMessage: (conversationId, message) => {
        const id = Math.random().toString(36).substring(2, 11);
        const now = new Date();
        
        const newMessage: Message = {
          id,
          ...message,
          timestamp: now,
        };
        
        set((state) => ({
          conversations: state.conversations.map((conversation) => {
            if (conversation.id === conversationId) {
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
                updatedAt: now,
              };
            }
            return conversation;
          }),
        }));
      },
      
      updateConversationTitle: (conversationId, title) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) => {
            if (conversation.id === conversationId) {
              return {
                ...conversation,
                title,
                updatedAt: new Date(),
              };
            }
            return conversation;
          }),
        }));
      },
      
      deleteConversation: (conversationId) => {
        set((state) => {
          const newConversations = state.conversations.filter(
            (conversation) => conversation.id !== conversationId
          );
          
          // If the active conversation is deleted, set the first conversation as active
          let newActiveId = state.activeConversationId;
          if (state.activeConversationId === conversationId) {
            newActiveId = newConversations.length > 0 ? newConversations[0].id : null;
          }
          
          return {
            conversations: newConversations,
            activeConversationId: newActiveId,
          };
        });
      },
      
      clearConversations: () => set({ conversations: [], activeConversationId: null }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setActiveTab: (activeTab) => set({ activeTab }),
      
      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
      
      setPreference: (key, value) => set((state) => ({
        preferences: {
          ...state.preferences,
          [key]: value,
        },
      })),
      
      logout: () => set({
        isAuthenticated: false,
        user: null,
        conversations: [],
        activeConversationId: null,
      }),
    }),
    {
      name: 'multimodal-app-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
        preferences: state.preferences,
      }),
    }
  )
);

// Helper hooks
export const useActiveConversation = () => {
  const { conversations, activeConversationId } = useStore();
  return conversations.find((conversation) => conversation.id === activeConversationId) || null;
};

export const usePreferences = () => {
  return useStore((state) => state.preferences);
};

export default useStore; 