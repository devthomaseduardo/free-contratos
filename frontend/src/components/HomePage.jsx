import React, { useState } from 'react';
import { ArrowRight, Fingerprint, Globe, Shield, Zap, Layout, ArrowUpRight, Database, Coffee, X, Copy, CheckCircle2 } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import { createPixPayment } from '../services/api';

export const HomePage = ({ onAccessDemo, onNavigate }) => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [isLoadingPix, setIsLoadingPix] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handlePixGeneration = async () => {
    setIsLoadingPix(true);
    try {
        const data = await createPixPayment({
            amount: 15.0,
            description: 'Apoio Paper Contracts - Sustente a Inovação',
            email: 'test_user_504671374@testuser.com'
        });
        setPixData(data);
    } catch (error) {
        console.error('Erro ao gerar Pix:', error);
    } finally {
        setIsLoadingPix(false);
    }
  };

  const copyPixKey = () => {
    if (pixData?.qr_code) {
        navigator.clipboard.writeText(pixData.qr_code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
  };
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      onAccessDemo(); 
    } catch (error) {
      console.error("Erro ao logar com Google:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0c] text-[#e0e2e5] font-serif selection:bg-azure/30 overflow-x-hidden">
      {/* Editorial Header */}
      <nav className="fixed w-full z-[100] px-4 md:px-8 py-4 md:py-8 flex items-center justify-between bg-[#080a0c]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 md:gap-6 group cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border border-white/20 transition-transform group-hover:rotate-12">
             <Fingerprint size={18} className="text-black" />
          </div>
          <span className="font-black text-lg md:text-2xl tracking-tighter text-white uppercase italic">Paper Contracts.</span>
        </div>
        
        {/* Navigation links removed for a cleaner minimalist aesthetic */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-azure hover:border-azure/30 hover:bg-azure/5 transition-all active:scale-90"
            title="Apoiar Desenvolvedor"
          >
            <Coffee size={20} />
          </button>

          <button
            onClick={() => onNavigate('login')}
            className="group flex items-center gap-3 bg-white text-black px-4 md:px-8 py-2 md:py-4 rounded-full transition-all active:scale-95"
          >
            <span className="text-[10px] font-black uppercase tracking-widest italic hidden sm:inline">Acessar Sistema</span>
            <span className="text-[10px] font-black uppercase tracking-widest italic sm:hidden">Entrar</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Support Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-[#080a0c]/90 backdrop-blur-md"
            onClick={() => setIsSupportModalOpen(false)}
          />
          <div className="relative premium-glass p-8 md:p-12 rounded-[3rem] border border-azure/30 bg-azure/5 max-w-md w-full animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="space-y-8 text-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-3xl bg-azure/20 border border-azure/30 flex items-center justify-center text-azure animate-pulse">
                  <Coffee size={40} />
                </div>
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-azure">Protocolo de Combustão</span>
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">Sustente a Inovação.</h3>
                <p className="text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest">
                  Contribua com o café que alimenta o código. Simples, direto e essencial.
                </p>
                <p className="text-[10px] text-white/20 leading-relaxed font-medium uppercase tracking-[0.2em] mt-4 italic">
                  Colabore com qualquer valor. Seu incentivo ajuda o desenvolvedor a adicionar mais funcionalidades.
                </p>
              </div>

              {!pixData ? (
                <>
                  <div className="pt-6 border-t border-white/5 flex items-end justify-center gap-2">
                    <span className="text-4xl font-black text-white tracking-tighter italic">R$ 15</span>
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-2">/ único</span>
                  </div>

                  <button 
                    onClick={handlePixGeneration}
                    disabled={isLoadingPix}
                    className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all bg-azure text-white shadow-lg shadow-azure/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {isLoadingPix ? 'Gerando Chave Pix...' : 'Iniciar Apoio via Pix'}
                  </button>
                </>
              ) : (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex justify-center">
                        <div className="p-4 bg-white rounded-[2rem] shadow-2xl border-4 border-azure/20">
                            <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} alt="QR Code Pix" className="w-48 h-48" />
                        </div>
                    </div>
                    
                    <button 
                        onClick={copyPixKey}
                        className="w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all"
                    >
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest truncate max-w-[200px]">
                            {pixData.qr_code}
                        </span>
                        <div className="flex items-center gap-2 text-azure">
                            {isCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                            <span className="text-[9px] font-black uppercase tracking-widest">
                                {isCopied ? 'Copiado' : 'Copiar'}
                            </span>
                        </div>
                    </button>

                    <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em]">Escaneie o código ou copie a chave acima</p>
                </div>
              )}
              
              <p className="text-[9px] text-white/10 uppercase font-black tracking-widest">Integridade Forense Garantida</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Editorial Layout */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-32 px-6 md:px-8 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full max-w-[1600px] mx-auto">
          
          <div className="lg:col-span-6 space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-azure block animate-in fade-in slide-in-from-bottom-4">Padrão Forense Digital</span>
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter italic">
                A Arte de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic">Vencer Documentos.</span>
              </h1>
            </div>

            <p className="text-lg md:text-2xl text-white/50 leading-relaxed font-light max-w-xl italic">
              Não é apenas um gerador. É uma ferramenta de precisão artesanal que funde tipografia clássica com inteligência semântica para o profissional de elite.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
              <button
                onClick={() => onNavigate('login')}
                className="group w-full sm:w-auto bg-azure text-white px-12 py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all hover:bg-blue-400 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] flex items-center justify-center gap-4 active:scale-95 italic"
              >
                Iniciar Sessão
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-px w-20 bg-white/10 hidden sm:block" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] italic">Disponível para Web & Desktop</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5">
              <img 
                src="/editorial-hero.png" 
                alt="Editorial Paper and Ink" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Overlay Info */}
            <div className="absolute -bottom-10 -left-10 p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl animate-float max-w-xs">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                    <Zap size={24} className="text-black" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">Processamento Semântico</span>
               </div>
               <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">
                 Análise em tempo real de cláusulas jurídicas e requisitos técnicos via Motor Gemini 1.5 Pro.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Workflow Section - Step by Step */}
      <section className="py-40 px-8 lg:px-24 bg-midnight-lighter/20 border-t border-white/[0.03]">
         <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
               <div className="lg:w-1/3 space-y-8 sticky top-40">
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-azure">Protocolo de Operação</span>
                  <h2 className="text-6xl font-black text-white italic tracking-tighter leading-none">Fluxo Operacional.</h2>
                  <p className="text-white/40 text-lg font-light leading-relaxed">
                     Cada documento passa por um processo rigoroso de refinamento técnico e validação semântica antes de ser selado para exportação.
                  </p>
               </div>

               <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { step: '01', title: 'Ingestão de Dados', desc: 'Captura de requisitos estratégicos e definição de escopo técnico com precisão absoluta.', icon: Fingerprint },
                    { step: '02', title: 'Análise Semântica', desc: 'IA de última geração (Gemini 1.5) refina cada cláusula para máxima clareza e autoridade.', icon: Zap },
                    { step: '03', title: 'Filtro de Admissão', desc: 'Simulação de leitura via ATS para garantir que seu perfil seja priorizado por algoritmos de recrutamento.', icon: Layout },
                    { step: '04', title: 'Selagem Forense', desc: 'Exportação em PDF de alta fidelidade com marcas d\'água de integridade e diagramação suíça.', icon: Shield }
                  ].map((item, idx) => (
                    <div key={idx} className="premium-glass p-10 rounded-[2.5rem] border border-white/5 hover:border-azure/20 transition-all group">
                       <div className="flex justify-between items-start mb-8">
                          <item.icon size={32} className="text-azure/40 group-hover:text-azure transition-colors" />
                          <span className="text-4xl font-black text-white/5 font-mono italic">{item.step}</span>
                       </div>
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4 italic">{item.title}</h3>
                       <p className="text-sm text-white/40 leading-relaxed font-medium uppercase tracking-widest">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Footer Editorial */}
      <footer className="py-32 px-8 lg:px-24 bg-[#05070a] border-t border-white/5">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="col-span-2 space-y-10">
               <h3 className="text-4xl font-black italic tracking-tighter text-white">Paper Contracts.</h3>
               <p className="text-white/30 text-sm max-w-sm uppercase tracking-widest leading-loose font-bold">
                 A plataforma definitiva para quem entende que a apresentação é 50% da vitória.
               </p>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Identidade</h4>
               <p className="text-xs text-white/40 uppercase font-bold tracking-widest leading-relaxed">
                 Soberania Digital <br/>
                 Padrão Editorial 2024
               </p>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Contato</h4>
               <p className="text-xs text-white/40 uppercase font-bold tracking-widest">suporte@papercontracts.com</p>
               <div className="flex gap-4 pt-4">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"><ArrowUpRight size={14} /></div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"><ArrowUpRight size={14} /></div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};
