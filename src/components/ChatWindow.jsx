import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { Bot, Sparkles, Menu } from 'lucide-react';

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center mt-0.5">
        <Bot size={14} className="text-slate-950" />
      </div>
      <div className="bg-dark-700 border border-dark-600 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="dot-typing">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6 animate-fade-in">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
        <Sparkles size={24} className="text-brand-400 md:w-7 md:h-7" />
      </div>
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">DistriforceAI</h2>
        <p className="text-sm text-slate-600 max-w-xs">
          Votre assistant IA intelligent. Posez vos questions, générez du code, obtenez des analyses.
        </p>
      </div>
    </div>
  );
}

export default function ChatWindow({ chat, onSend, isLoading, onMenuClick }) {
  const bottomRef = useRef(null);
  const messages = chat?.messages || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 md:px-5 py-3 border-b border-dark-600 flex items-center gap-2 md:gap-3 bg-dark-800 backdrop-blur-sm">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-brand-700 hover:bg-dark-600 transition-colors flex-shrink-0"
        >
          <Menu size={18} />
        </button>

        <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse flex-shrink-0" />
        <h1 className="text-sm font-semibold text-slate-900 truncate flex-1 min-w-0">
          {chat?.title || 'DistriforceAI'}
        </h1>
        {chat && (
          <span className="ml-auto text-xs text-slate-500 flex-shrink-0">
            {messages.length} msg{messages.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 md:px-4 py-4 space-y-4">
        {messages.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))
        )}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSubmit={onSend}
        isLoading={isLoading}
        isEmpty={messages.length === 0}
      />
    </div>
  );
}
