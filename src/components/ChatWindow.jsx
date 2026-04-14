import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { Bot, Sparkles } from 'lucide-react';

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
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
        <Sparkles size={28} className="text-brand-400" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">DistriforceAI</h2>
        <p className="text-sm text-slate-600 max-w-xs">
          Votre assistant IA intelligent. Posez vos questions, générez du code, obtenez des analyses.
        </p>
      </div>
    </div>
  );
}

export default function ChatWindow({ chat, onSend, isLoading }) {
  const bottomRef = useRef(null);
  const messages = chat?.messages || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-dark-600 flex items-center gap-2 bg-dark-800 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        <h1 className="text-sm font-semibold text-slate-900 truncate">
          {chat?.title || 'DistriforceAI'}
        </h1>
        {chat && (
          <span className="ml-auto text-xs text-slate-500">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
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
