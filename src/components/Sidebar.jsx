import { MessageSquare, Plus, Trash2, Trash, ChevronLeft, ChevronRight, Bot, X } from 'lucide-react';

export default function Sidebar({ chats, activeChatId, onSelect, onCreate, onDelete, onClearAll, collapsed, onToggle, mobileOpen, onMobileClose }) {
  return (
    <aside
      className={`
        flex flex-col h-full bg-dark-800 border-r border-dark-600 shadow-sm backdrop-blur-sm
        transition-all duration-300 flex-shrink-0
        fixed top-0 left-0 z-50
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        w-72
        md:relative md:translate-x-0 md:z-auto
        ${collapsed ? 'md:w-14' : 'md:w-64'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-dark-600">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Bot size={14} className="text-slate-950" />
            </div>
            <span className="font-bold text-sm tracking-wide text-brand-700">DistriforceAI</span>
          </div>
        )}
        {collapsed && (
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center mx-auto">
            <Bot size={14} className="text-slate-950" />
          </div>
        )}

        {/* Desktop toggle */}
        <button
          onClick={onToggle}
          className="hidden md:flex ml-auto p-1.5 rounded-lg text-slate-600 hover:text-brand-700 hover:bg-dark-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="md:hidden ml-auto p-1.5 rounded-lg text-slate-600 hover:text-brand-700 hover:bg-dark-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-2">
        <button
          onClick={onCreate}
          className={`flex items-center gap-2 w-full rounded-xl px-3 py-2.5 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-slate-950 transition-colors ${collapsed ? 'md:justify-center' : ''}`}
        >
          <Plus size={15} />
          <span className={collapsed ? 'md:hidden' : ''}>Nouvelle conversation</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto py-1 space-y-0.5 px-2">
        {chats.length === 0 && (
          <p className={`text-xs text-slate-500 text-center mt-6 px-2 ${collapsed ? 'md:hidden' : ''}`}>
            Aucune conversation
          </p>
        )}
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 cursor-pointer transition-all ${
              activeChatId === chat.id
                ? 'bg-brand-500/12 text-brand-700 border border-brand-500/25'
                : 'text-slate-700 hover:bg-dark-700 hover:text-slate-900'
            } ${collapsed ? 'md:justify-center' : ''}`}
          >
            <MessageSquare size={14} className="flex-shrink-0" />
            <span className={`text-xs truncate flex-1 ${collapsed ? 'md:hidden' : ''}`}>{chat.title}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(chat.id); }}
              className={`p-1 rounded-md hover:text-red-400 transition-all flex-shrink-0 ${collapsed ? 'md:hidden' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <Trash2 size={11} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      {chats.length > 0 && (
        <div className={`p-2 border-t border-dark-600 ${collapsed ? 'md:hidden' : ''}`}>
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 w-full rounded-xl px-3 py-2 text-xs text-slate-500 hover:text-red-400 hover:bg-dark-700 transition-colors"
          >
            <Trash size={12} />
            <span>Tout effacer</span>
          </button>
        </div>
      )}
    </aside>
  );
}
