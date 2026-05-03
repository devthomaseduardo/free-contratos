import {
  X,
  ShieldCheck,
  ChevronRight,
  Fingerprint,
  Zap,
  LogOut,
  History,
  Cloud,
  Trash2,
  FileText,
  Activity
} from 'lucide-react';

export const Sidebar = ({ currentType, onSelect, isOpen, onClose, user, onLogout, onViewAnalytics, cloudHistory = [], onLoadCloud, onDeleteCloud }) => {

  const menu = [
    { id: 'cv', label: 'Currículo Vitae', code: '01', desc: 'Recrutamento & Performance' },
    { id: 'coverLetter', label: 'Carta de Apresentação', code: '02', desc: 'Introdução Estratégica' },
    { id: 'contract', label: 'Contrato de Serviço', code: '03', desc: 'Estrutura Jurídica' },
    { id: 'nda', label: 'Acordo de Sigilo', code: '04', desc: 'Confidencialidade' },
    { id: 'quote', label: 'Proposta Comercial', code: '05', desc: 'Escopo Financeiro' },
    { id: 'letterhead', label: 'Identidade Visual', code: '06', desc: 'Branding Institucional' },
    { id: 'invoice', label: 'Fatura de Serviço', code: '07', desc: 'Registro de Pagamento' },
    { id: 'petition', label: 'Petição Jurídica', code: '08', desc: 'Processos & Ofícios' },
  ];

  return (
    <div 
      tabIndex="-1"
      role="navigation"
      aria-label="Menu Lateral"
      className={`fixed inset-y-0 left-0 z-[60] w-full max-w-[320px] bg-[#05070a] border-r border-white/[0.03] flex flex-col transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full shadow-none'}`}
    >
      
      {/* Mobile Close Button */}
      <button 
        onClick={onClose}
        className="absolute right-6 top-8 lg:hidden text-slate-500 hover:text-white transition-all bg-white/5 p-2 rounded-xl"
      >
        <X size={20} />
      </button>

      {/* Header / Brand Identity */}
      <div className="h-32 px-10 flex flex-col justify-center border-b border-white/[0.03]">
        <div className="flex items-center gap-4 group cursor-default">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-azure/50 transition-all duration-500 shadow-2xl">
             <Fingerprint size={24} className="text-white group-hover:text-azure transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-white uppercase leading-none">Paper Contracts</span>
            <div className="flex items-center gap-2 mt-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" />
               <span className="text-[9px] text-slate-500 font-black tracking-[0.2em] uppercase">Motor Editorial V3.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Editorial Index Style */}
      <nav 
        tabIndex="0"
        className="flex-1 overflow-y-auto p-8 space-y-3 custom-scrollbar focus:outline-none focus-visible:bg-white/[0.02]"
      >
        <div className="flex items-center justify-between px-6 mb-12">
           <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Protocolos Ativos</p>
        </div>

        {menu.map((item) => {
          const isActive = currentType === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full group flex items-center gap-4 p-3 rounded-2xl transition-all duration-500 relative border ${
                isActive 
                  ? 'bg-white/[0.03] border-white/10 shadow-xl translate-x-1' 
                  : 'bg-transparent border-transparent hover:bg-white/[0.01] hover:translate-x-1'
              }`}
            >
              <div className={`text-[10px] font-black font-mono transition-colors duration-500 ${isActive ? 'text-azure' : 'text-slate-700 group-hover:text-slate-400'}`}>
                {item.code}
              </div>
              
              <div className="flex flex-col items-start flex-1">
                <span className={`text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                  {item.label}
                </span>
                <span className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 transition-colors duration-500 ${isActive ? 'text-slate-400' : 'text-slate-700 group-hover:text-slate-600'}`}>
                  {item.desc}
                </span>
              </div>

              <ChevronRight size={12} className={`transition-all duration-500 ${isActive ? 'text-azure translate-x-0 opacity-100' : 'text-slate-800 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </button>
          );
        })}

        {/* Cloud Dossiers Section */}
        {user && cloudHistory.length > 0 && (
          <div className="mt-12 space-y-4">
             <div className="flex items-center justify-between px-4 mb-4">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Dossiês na Nuvem</p>
                <Cloud size={12} className="text-azure opacity-50" />
             </div>
             <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cloudHistory.map(doc => (
                  <div key={doc.id} className="group relative flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                     <div className="w-8 h-8 rounded-lg bg-azure/10 flex items-center justify-center">
                        <FileText size={14} className="text-azure" />
                     </div>
                     <button 
                        onClick={() => onLoadCloud(doc)}
                        className="flex-1 text-left overflow-hidden"
                     >
                        <p className="text-[10px] font-black text-white truncate uppercase tracking-tighter">{doc.title}</p>
                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{new Date(doc.timestamp).toLocaleDateString()}</p>
                     </button>
                     <button 
                        onClick={() => onDeleteCloud(doc.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-rose-500 transition-all"
                     >
                        <Trash2 size={12} />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        )}
      </nav>

      {/* User Identity & Integrity Widget */}
      <div className="p-6 md:p-8 border-t border-white/[0.03] space-y-8 bg-black/20 backdrop-blur-md">
        {user && (
          <div className="flex items-center gap-4 group">
             <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-azure/30 p-0.5 group-hover:border-azure transition-all duration-500">
                   <img src={user.photoURL || `https://i.pravatar.cc/100?u=${user.email}`} alt={user.displayName} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#05070a] rounded-full flex items-center justify-center border border-white/10">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
             </div>
             <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-black text-white truncate uppercase tracking-tighter group-hover:text-azure transition-colors">{user.displayName || 'Thomas Eduardo'}</span>
                <span className="text-[8px] text-slate-500 font-mono font-bold tracking-widest uppercase truncate opacity-60">NÓDULO_ID: CONECTADO_01</span>
             </div>
          </div>
        )}

        <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl space-y-4 group hover:bg-white/[0.04] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <ShieldCheck size={12} className="text-azure opacity-50" />
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Integridade Estratégica</span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-white italic tracking-tighter">94.8%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5 p-[1px]">
                    <div className="h-full bg-azure rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '94%' }} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <button 
                    onClick={onViewAnalytics}
                    className="w-full py-4 flex items-center justify-center gap-3 bg-azure/10 hover:bg-azure text-azure hover:text-white rounded-2xl border border-azure/20 transition-all duration-500 text-[9px] font-black uppercase tracking-[0.3em] active:scale-95 group shadow-lg shadow-azure/5"
                >
                    <Activity size={16} className="group-hover:scale-110 transition-transform" /> 
                    Telemetria de Rede
                </button>

                <button 
                    onClick={onLogout}
                    className="w-full py-4 flex items-center justify-center gap-3 bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl border border-rose-500/10 transition-all duration-500 text-[9px] font-black uppercase tracking-[0.3em] active:scale-95 group"
                >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                    Encerrar Protocolo
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
