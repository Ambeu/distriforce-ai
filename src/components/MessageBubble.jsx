import ReactMarkdown from 'react-markdown';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-dark-600 text-slate-500 hover:text-slate-700 transition-all"
      title="Copier"
    >
      {copied ? <Check size={13} className="text-brand-400" /> : <Copy size={13} />}
    </button>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`group flex gap-3 animate-slide-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold mt-0.5 ${
        isUser
          ? 'bg-dark-600 text-slate-800'
          : 'bg-brand-500 text-slate-950'
      }`}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* Bubble */}
      <div className={`relative max-w-[78%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? 'bg-dark-600 text-slate-900 rounded-tr-sm'
            : 'bg-dark-700 border border-dark-600 text-slate-800 rounded-tl-sm'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose-chat">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[10px] text-slate-500">
            {new Date(message.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!isUser && <CopyButton text={message.content} />}
        </div>
      </div>
    </div>
  );
}
