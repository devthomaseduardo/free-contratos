import React from 'react';
import { ArrowLeft, Code, Terminal, Zap, Shield, Database, Globe, Cpu, ArrowUpRight, Copy, CheckCircle2 } from 'lucide-react';

export const DeveloperPage = ({ onBack }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-[#05070a] text-[#e0e2e5] font-mono selection:bg-azure/30 animate-in fade-in duration-700">
            {/* Nav */}
            <nav className="fixed w-full z-50 px-8 py-6 flex items-center justify-between bg-[#05070a]/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-azure/10 rounded-xl flex items-center justify-center border border-azure/20">
                        <Code size={20} className="text-azure" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Portal do Desenvolvedor.</h1>
                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Protocolo Alpha v3.0.2</p>
                    </div>
                </div>
                <button 
                    onClick={onBack}
                    className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
                >
                    <ArrowLeft size={14} />
                    Retornar ao Portal
                </button>
            </nav>

            <div className="max-w-[1400px] mx-auto pt-40 px-8 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Sidebar Docs */}
                <aside className="lg:col-span-3 space-y-12 hidden lg:block sticky top-40 h-fit">
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Introdução</h4>
                        <ul className="space-y-4">
                            {['Visão Geral', 'Autenticação', 'Limites de Taxa', 'Segurança'].map(item => (
                                <li key={item} className="text-[11px] font-bold text-slate-400 hover:text-azure cursor-pointer transition-colors uppercase tracking-widest">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Pontos de Acesso API</h4>
                        <ul className="space-y-4">
                            {['/forjar/documento', '/vault/seguro', '/protocolo/alpha', '/nódulo/status'].map(item => (
                                <li key={item} className="text-[11px] font-bold text-slate-400 hover:text-azure cursor-pointer transition-colors uppercase tracking-widest">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-azure/5 border border-azure/20">
                        <p className="text-[9px] text-azure font-black uppercase tracking-widest mb-2">Suporte Técnico</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase">Acesso direto ao Time Central via Canais Corporativos.</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9 space-y-24">
                    
                    {/* Hero Section */}
                    <section className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                            <CheckCircle2 size={12} />
                            Sistema Online & Operacional
                        </div>
                        <h2 className="text-6xl font-black text-white italic tracking-tighter">Engenharia Forense <br/> via Código.</h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                            Bem-vindo ao centro nevrálgico do Paper Contracts. Integre nossas capacidades de diagramação suíça e blindagem documental diretamente no seu fluxo operacional.
                        </p>
                    </section>

                    {/* Authentication Section */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <Shield size={24} className="text-azure" />
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Autenticação de Camada 01</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-bold uppercase tracking-widest">
                            Todas as requisições devem incluir o cabeçalho <code className="text-azure bg-azure/5 px-2 py-1 rounded">X-Forensic-Token</code>. Sua chave é gerada via Vault Forense e possui validade rotativa.
                        </p>
                        
                        <div className="premium-glass p-1 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                            <div className="bg-[#020305] p-6 flex items-center justify-between border-b border-white/5">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Exemplo de Requisição</span>
                                <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-slate-500"><Copy size={16} /></button>
                            </div>
                            <div className="p-8 bg-[#05070a]">
                                <pre className="text-xs text-azure leading-loose">
{`curl -X POST https://api.papercontracts.dev/v1/forjar \\
  -H "X-Forensic-Token: \${SUA_CHAVE_VAULT}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "protocolo": "ALPHA_2024",
    "modelo": "CV_EDITORIAL",
    "dados": { "nome": "THOMAS NASCIMENTO" }
  }'`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* SDK Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="premium-glass p-10 rounded-[2.5rem] border border-white/5 hover:border-azure/20 transition-all space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                <Terminal size={24} className="text-white" />
                            </div>
                            <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Kit de Desenvolvimento (SDK)</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest">Instale nosso pacote oficial para integração nativa em ambientes de alta performance.</p>
                            <code className="block bg-black/40 p-4 rounded-xl text-azure text-xs">npm install @paper-contracts/sdk</code>
                        </div>

                        <div className="premium-glass p-10 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/20 transition-all space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                <Database size={24} className="text-white" />
                            </div>
                            <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Webhooks</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest">Receba eventos em tempo real quando um dossiê for assinado ou validado.</p>
                            <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-500/20 pb-1">Configurar Ponto de Acesso</button>
                        </div>
                    </section>

                    {/* Tech Pillars Re-integration */}
                    <section className="pt-12 border-t border-white/5 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Protocolo Alpha</h5>
                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                    Nossa engine de renderização vetorial. Garante 300DPI em qualquer nível de zoom através de interpolação geométrica.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Vault Forense</h5>
                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                    Criptografia AES-256 GCM em repouso. Cada documento possui uma semente única de autenticidade (Semente-Hash).
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Node.js em Borda</h5>
                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                    Processamento distribuído (Edge Computing) para latência inferior a 150ms em gerações de PDF complexas.
                                </p>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
};
