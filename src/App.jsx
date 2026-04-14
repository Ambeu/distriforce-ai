import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { useChatHistory } from './hooks/useChatHistory';
import { askAI } from './services/api';

export default function App() {
  const {
    chats, activeChat, activeChatId,
    setActiveChatId, createChat, addMessage, deleteChat, clearAll
  } = useChatHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNewChat = () => {
    const id = createChat();
    setActiveChatId(id);
  };

  const handleSend = async (question) => {
    let chatId = activeChatId;
    if (!chatId) {
      chatId = createChat(question);
      setActiveChatId(chatId);
    }
    addMessage(chatId, { role: 'user', content: question, timestamp: new Date().toISOString() });
    setIsLoading(true);
    try {
      const answer = await askAI(question);
      addMessage(chatId, { role: 'assistant', content: answer, timestamp: new Date().toISOString() });
    } catch (err) {
      addMessage(chatId, {
        role: 'assistant',
        content: `❌ **Erreur de connexion**\n\n${err.message}\n\nVérifiez que l'API DistriforceAI est accessible.`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-dark-900 text-slate-900">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelect={setActiveChatId}
        onCreate={handleNewChat}
        onDelete={deleteChat}
        onClearAll={clearAll}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(p => !p)}
      />
      <main className="flex-1 overflow-hidden bg-white/55 backdrop-blur-[2px]">
        <ChatWindow chat={activeChat} onSend={handleSend} isLoading={isLoading} />
      </main>
    </div>
  );
}
