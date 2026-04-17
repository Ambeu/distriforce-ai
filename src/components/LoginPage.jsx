import { useState } from 'react';
import { Bot, Eye, EyeOff, Lock } from 'lucide-react';

const PASSWORD = import.meta.env.VITE_ACCESS_PASSWORD || 'distriforce2024';

export default function LoginPage({ onSuccess }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem('df_auth', '1');
      onSuccess();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Bot size={28} className="text-brand-400" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-800">DistriforceAI</h1>
            <p className="text-sm text-slate-500 mt-1">Accès restreint — identifiez-vous</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-dark-800 border border-dark-600 rounded-2xl p-6 shadow-xl ${shaking ? 'animate-shake' : ''}`}
        >
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
            <Lock size={11} className="inline mr-1" />
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false); }}
              className={`w-full bg-dark-700 border rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                error
                  ? 'border-red-500/60 focus:border-red-500'
                  : 'border-dark-500 focus:border-brand-500'
              }`}
              placeholder="••••••••••••"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-400 mt-2">Mot de passe incorrect.</p>
          )}

          <button
            type="submit"
            className="mt-4 w-full bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold text-sm rounded-xl py-3 transition-colors"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}
