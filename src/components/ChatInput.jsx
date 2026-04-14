import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

const SUGGESTIONS = [
  'Explique-moi les bases de React',
  'Génère un code Python pour lire un CSV',
  'Rédige un email professionnel de relance',
  'Comment optimiser une requête SQL ?',
];

export default function ChatInput({ onSubmit, isLoading, isEmpty }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [value]);

  const handleSubmit = () => {
    const q = value.trim();
    if (!q || isLoading) return;
    onSubmit(q);
    setValue('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="px-4 pb-4 pt-2">
      {/* Quick suggestions on empty chat */}
      {isEmpty && (
        <div className="flex flex-wrap gap-2 mb-3 justify-center">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => { setValue(s); textareaRef.current?.focus(); }}
              className="text-xs px-3 py-1.5 rounded-xl bg-dark-700 border border-dark-600 text-slate-700 hover:border-brand-500 hover:text-brand-700 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="glow-border bg-dark-800 border border-dark-600 rounded-2xl flex items-end gap-2 p-3 transition-all">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Posez votre question à DistriforceAI…"
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-500 resize-none outline-none leading-relaxed max-h-40 disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95"
        >
          {isLoading
            ? <Loader2 size={15} className="text-slate-950 animate-spin" />
            : <Send size={15} className="text-slate-950" />
          }
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-500 mt-2">
        Entrée pour envoyer · Maj+Entrée pour nouvelle ligne
      </p>
    </div>
  );
}
