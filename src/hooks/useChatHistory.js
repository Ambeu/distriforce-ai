import { useState, useCallback } from 'react';

const STORAGE_KEY = 'distriforce_chats';

function loadChats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveChats(chats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

export function useChatHistory() {
  const [chats, setChats] = useState(() => loadChats());
  const [activeChatId, setActiveChatId] = useState(() => {
    const saved = loadChats();
    return saved[0]?.id || null;
  });

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  const createChat = useCallback((firstMessage = null) => {
    const id = Date.now().toString();
    const newChat = {
      id,
      title: firstMessage ? firstMessage.slice(0, 40) + (firstMessage.length > 40 ? '…' : '') : 'Nouvelle conversation',
      createdAt: new Date().toISOString(),
      messages: [],
    };
    setChats(prev => {
      const updated = [newChat, ...prev];
      saveChats(updated);
      return updated;
    });
    setActiveChatId(id);
    return id;
  }, []);

  const addMessage = useCallback((chatId, message) => {
    setChats(prev => {
      const updated = prev.map(chat => {
        if (chat.id !== chatId) return chat;
        const messages = [...chat.messages, message];
        // Update title from first user message
        const title = messages.find(m => m.role === 'user')?.content.slice(0, 45) || chat.title;
        return { ...chat, messages, title: title + (title.length >= 45 ? '…' : '') };
      });
      saveChats(updated);
      return updated;
    });
  }, []);

  const deleteChat = useCallback((chatId) => {
    setChats(prev => {
      const updated = prev.filter(c => c.id !== chatId);
      saveChats(updated);
      return updated;
    });
    setActiveChatId(prev => {
      if (prev !== chatId) return prev;
      const remaining = chats.filter(c => c.id !== chatId);
      return remaining[0]?.id || null;
    });
  }, [chats]);

  const clearAll = useCallback(() => {
    setChats([]);
    setActiveChatId(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createChat,
    addMessage,
    deleteChat,
    clearAll,
  };
}
