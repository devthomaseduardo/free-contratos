import React from 'react';
import {
  FileText,
  Calculator,
  UserCircle,
  ScrollText,
  ShieldCheck,
  ChevronRight,
  Receipt,
  FileBadge,
  Lock,
  Send,
} from 'lucide-react';
import { DocumentType } from '../types';

interface SidebarProps {
  currentType: DocumentType;
  onSelect: (type: DocumentType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentType, onSelect }) => {
  const menu = [
    { id: 'contract' as const, label: 'Contrato', icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'nda' as const, label: 'NDA / Sigilo', icon: Lock, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { id: 'quote' as const, label: 'Orçamento', icon: Calculator, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'invoice' as const, label: 'Nota Fiscal', icon: Receipt, color: 'text-teal-400', bg: 'bg-teal-400/10' },
    { id: 'declaration' as const, label: 'Declaração', icon: FileBadge, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: 'letter' as const, label: 'Timbrado', icon: ScrollText, color: 'text-slate-400', bg: 'bg-slate-400/10' },
    { id: 'coverLetter' as const, label: 'Carta Apresentação', icon: Send, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'cv' as const, label: 'Currículo', icon: UserCircle, color: 'text-sky-400', bg: 'bg-sky-400/10' },
  ];

  return (
    <div className="w-20 lg:w-72 bg-[#0B0F19] border-r border-slate-800 flex flex-col h-full shrink-0 transition-all duration-300">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-slate-800/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0 relative overflow-hidden group">
          <ShieldCheck className="text-white relative z-10" size={20} />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </div>
        <div className="ml-4 hidden lg:block">
          <h1 className="font-bold text-lg text-white tracking-tight leading-none">
            Contract<span className="text-indigo-400">Forge</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-1">Dev Suite</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="hidden lg:block px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">Documentos</p>
        {menu.map((item) => {
          const isActive = currentType === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden border ${
                isActive
                  ? 'bg-slate-800/50 border-slate-700 text-white shadow-lg'
                  : 'border-transparent text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? item.bg : 'bg-slate-800'} transition-colors`}>
                <Icon size={20} className={`${isActive ? item.color : 'text-slate-500 group-hover:text-slate-300'}`} />
              </div>
              <span className={`font-medium hidden lg:block flex-1 text-left ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
              {isActive && <ChevronRight size={16} className="text-slate-500 hidden lg:block animate-pulse" aria-hidden />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 hidden lg:block">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 border border-slate-700/50 relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-bold text-slate-200 text-sm mb-1">Backup Automático</p>
            <p className="text-xs text-slate-400 leading-relaxed">Seus dados e logo ficam salvos neste navegador.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
