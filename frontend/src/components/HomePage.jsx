import React from 'react';
import { ArrowRight, BrainCircuit, Scale, Fingerprint, Briefcase, Target, Printer, LogIn } from 'lucide-react';
import { signInWithGoogle } from '../firebase';

export const HomePage = ({ onAccessDemo }) => {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      onAccessDemo(); // Redireciona para o app após o login
    } catch (error) {
      console.error("Erro ao logar com Google:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 font-sans selection:bg-azure/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-azure/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 blur-[150px] rounded-full mix-blend-screen opacity-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 md:px-16 py-8 flex items-center justify-between backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <img src="/paper‑contracts.png" alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-white leading-none">Paper Contracts</span>
            <span className="text-[9px] text-azure uppercase tracking-[0.2em] font-bold mt-1">Enterprise Suite v3.1</span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          <a href="#features" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Tecnologia</a>
          <a href="#metrics" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Segurança</a>
          <a href="#pricing" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Empresas</a>
        </nav>

        <button
          onClick={handleLogin}
          className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl transition-all active:scale-95"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
          <span className="text-[11px] font-black uppercase tracking-widest text-white">Login com Google</span>
        </button>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 md:px-16 pt-24 pb-32 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-azure/10 border border-azure/20 backdrop-blur-2xl">
              <span className="flex h-1.5 w-1.5 rounded-full bg-azure animate-pulse" />
              <span className="text-[10px] font-black text-azure uppercase tracking-[0.15em]">SaaS de Documentação Forense</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95]">
              Vença no <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure via-blue-400 to-emerald-400">Primeiro Olhar.</span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-xl">
              A única plataforma que combina IA Preditiva para ATS, tipografia forense e segurança descentralizada para elevar sua autoridade profissional.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
              <button
                onClick={handleLogin}
                className="group w-full sm:w-auto bg-white text-black px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all hover:bg-azure hover:text-white hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] flex items-center justify-center gap-4"
              >
                Começar Agora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#05070a] bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
                <div className="pl-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  +12.4k profissionais usando
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center">
            {/* Main Hero Image Frame */}
            <div className="relative z-10 w-full aspect-square max-w-[600px] group">
              <div className="absolute inset-0 bg-azure/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl animate-float p-4 bg-white/5 backdrop-blur-3xl">
                <img 
                  src="/paper_contracts_hero_premium_1777752005104.png" 
                  alt="Premium Document Visualization" 
                  className="w-full h-full object-cover rounded-[2rem] border border-white/5"
                />
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute -top-10 -right-10 p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl animate-float-slow hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                    <BrainCircuit className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">IA Score</div>
                    <div className="text-2xl font-black text-white">98% Match</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-10 p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl animate-float hidden md:block" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-azure/20 rounded-xl border border-azure/30">
                    <Fingerprint className="text-azure" size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Security</div>
                    <div className="text-2xl font-black text-white">Encrypted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="px-6 md:px-16 py-32 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Tecnologia que <br/> impulsiona sua carreira.</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Cada pixel e cada linha de código foi pensada para garantir que sua apresentação profissional seja impecável perante máquinas e humanos.
              </p>
            </div>
            <div className="p-1 px-4 bg-white/5 rounded-full border border-white/10">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Features 2026 Edition</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px]">
            {/* Feature 1: ATS */}
            <div className="md:col-span-8 premium-glass p-12 rounded-[3rem] border border-white/5 group relative overflow-hidden flex flex-col justify-between">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-azure/10 to-transparent pointer-events-none" />
               <div>
                  <div className="w-14 h-14 bg-azure/10 rounded-2xl border border-azure/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <Target size={28} className="text-azure" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-none">Análise Preditiva ATS</h3>
                  <p className="text-slate-400 text-lg max-w-md leading-relaxed">Não deixe sua carreira nas mãos do acaso. Nosso motor analisa semânticamente cada requisito da vaga antes de você enviar.</p>
               </div>
               <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">1.2ms</span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Processing speed</span>
                  </div>
                  <div className="w-px h-10 bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">GPT-O</span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Core Engine</span>
                  </div>
               </div>
            </div>

            {/* Feature 2: Forensic */}
            <div className="md:col-span-4 bg-gradient-to-br from-emerald-500 to-teal-700 p-12 rounded-[3rem] flex flex-col justify-between shadow-2xl">
               <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center shadow-lg">
                  <Scale size={28} className="text-white" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none">Petições <br/> de Elite.</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Tipografia forense suíça adaptada para tribunais digitais.</p>
               </div>
               <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white border-b border-white/30 pb-2 w-max">
                  Explorar Modelos <ArrowRight size={14} />
               </button>
            </div>

            {/* Feature 3: Security */}
            <div className="md:col-span-4 premium-glass p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center justify-center space-y-6">
                <div className="w-20 h-20 bg-azure/5 rounded-full flex items-center justify-center border border-azure/20 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                   <Fingerprint size={32} className="text-azure animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">Privacy First</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Criptografia AES-256 local. Seus dados nunca tocam nossos servidores sem sua permissão expressa.</p>
            </div>

            {/* Feature 4: Cloud */}
            <div className="md:col-span-8 premium-glass p-12 rounded-[3rem] border border-white/5 flex items-center gap-10 group">
               <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none">Sincronização em <br/> Tempo Real via Cloud.</h3>
                  <p className="text-slate-400 leading-relaxed">Edite seu currículo no desktop e visualize o dossiê de entrevista no mobile instantaneamente.</p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">Google Auth</div>
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">Zero Latency</div>
                  </div>
               </div>
               <div className="hidden lg:block w-1/3 relative aspect-square">
                  <div className="absolute inset-0 bg-azure/20 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative w-full h-full bg-white/5 rounded-full border border-white/10 flex items-center justify-center">
                    <Briefcase size={64} className="text-white/20" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-16 py-20 border-t border-white/5 bg-[#030508] relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-azure to-transparent opacity-50" />
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
              <img src="/paper‑contracts.png" alt="Logo" className="w-6 h-6 object-contain" />
              <span className="font-black text-sm tracking-tighter text-white">Paper Contracts</span>
            </div>
            <div className="flex gap-10">
               <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Termos</a>
               <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Privacidade</a>
               <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Suporte</a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              &copy; 2026 Paper Contracts Inc. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};
