import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import LoginPage from './components/LoginPage';
import { useChatHistory } from './hooks/useChatHistory';
import { askAI } from './services/api';

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('df_auth') === '1'
  );

  const {
    chats, activeChat, activeChatId,
    setActiveChatId, createChat, addMessage, deleteChat, clearAll
  } = useChatHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer

  const handleNewChat = () => {
    const id = createChat();
    setActiveChatId(id);
    setSidebarOpen(false);
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

  if (!authenticated) {
    return <LoginPage onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-dark-900 text-slate-900">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelect={(id) => { setActiveChatId(id); setSidebarOpen(false); }}
        onCreate={handleNewChat}
        onDelete={deleteChat}
        onClearAll={clearAll}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(p => !p)}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-hidden bg-white/55 backdrop-blur-[2px] min-w-0">
        <ChatWindow
          chat={activeChat}
          onSend={handleSend}
          isLoading={isLoading}
          onMenuClick={() => setSidebarOpen(true)}
        />
      </main>
    </div>
  );
}
