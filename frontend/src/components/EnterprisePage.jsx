import React from 'react';
import { Building2, Users, Briefcase, BarChart3, ArrowLeft, Globe, Zap } from 'lucide-react';

export const EnterprisePage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 font-sans selection:bg-azure/30 p-6 md:p-16 relative overflow-hidden">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Voltar</span>
      </button>

      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05)_0%,transparent_50%)] pointer-events-none" />

      <main className="max-w-6xl mx-auto pt-24 relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
           <Building2 size={14} className="text-blue-400" />
           <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Enterprise Solutions</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
          Escala. Controle. <br/> Autoridade de Marca.
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-20 font-medium">
          Transforme a forma como sua organização lida com documentos e talentos. Do RH ao Jurídico, oferecemos ferramentas de precisão forense.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Enterprise Feature 1 */}
           <div className="group premium-glass p-12 rounded-[3rem] border border-white/5 hover:border-blue-400/30 transition-all">
              <div className="flex justify-between items-start mb-10">
                 <div className="w-16 h-16 bg-blue-400/10 rounded-2xl flex items-center justify-center border border-blue-400/20">
                    <Users size={32} className="text-blue-400" />
                 </div>
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Para RH & Recrutamento</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Análise de Talentos em Massa</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Passe milhares de currículos pelo nosso motor de IA e obtenha dossiês técnicos instantâneos para acelerar o processo de triagem com 100% de imparcialidade.
              </p>
           </div>

           {/* Enterprise Feature 2 */}
           <div className="group premium-glass p-12 rounded-[3rem] border border-white/5 hover:border-emerald-400/30 transition-all">
              <div className="flex justify-between items-start mb-10">
                 <div className="w-16 h-16 bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-400/20">
                    <Briefcase size={32} className="text-emerald-400" />
                 </div>
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Para Escritórios</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Padronização Institucional</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Garanta que cada contrato, fatura e proposta comercial siga rigorosamente a identidade visual e os padrões jurídicos da sua marca em todos os departamentos.
              </p>
           </div>
        </div>

        <div className="mt-20 py-16 px-12 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Planos Customizados</h4>
              <h3 className="text-3xl font-black text-white tracking-tight leading-none uppercase">Pronto para <br/> grandes desafios?</h3>
           </div>
           <div className="flex flex-col sm:flex-row gap-6">
              <div className="text-center md:text-right">
                 <div className="text-4xl font-black text-white tracking-tighter">Unlimited</div>
                 <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">API Access & White Label</div>
              </div>
              <button className="bg-white text-black px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-azure hover:text-white transition-all shadow-xl active:scale-95">
                 Falar com Consultor
              </button>
           </div>
        </div>
      </main>
    </div>
  );
};
