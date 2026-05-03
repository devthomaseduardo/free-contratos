import React, { useState, useEffect } from 'react';
import { Globe, Activity, Users, FileText, Shield, ArrowUpRight, Zap, Database } from 'lucide-react';

export const AnalyticsDashboard = ({ onBack }) => {
    const [stats, setStats] = useState({
        totalViews: 1248,
        activeNodes: 8,
        uptime: '99.99%',
        docsGenerated: 342
    });

    // Logs simulados em tempo real
    const [logs, setLogs] = useState([
        { id: 1, event: 'SINCRONIZAÇÃO_COMPLETA', ip: '192.168.0.***', node: 'PHNX-01', time: 'Agora' },
        { id: 2, event: 'CAMADA_CRIPTOGRAFIA_02', ip: '172.16.2.***', node: 'PHNX-04', time: '2m atrás' },
        { id: 3, event: 'GERAÇÃO_DOC_CV', ip: '10.0.0.***', node: 'PHNX-01', time: '5m atrás' },
        { id: 4, event: 'AUTENTICAÇÃO_SUCESSO', ip: '189.12.0.***', node: 'PHNX-02', time: '12m atrás' },
    ]);

    return (
        <div className="min-h-screen bg-midnight text-white p-6 lg:p-12 animate-in fade-in duration-700">
            {/* CABEÇALHO */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[2rem] bg-azure/20 border border-azure/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <Activity size={32} className="text-azure animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-1">Telemetria de Rede</h1>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Monitoramento de Tráfego e Operações Forenses</p>
                    </div>
                </div>
                <button 
                    onClick={onBack}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 active:scale-95"
                >
                    Sair do Painel
                </button>
            </div>

            {/* MÉTRICAS PRINCIPAIS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Visualizações Totais', value: stats.totalViews, icon: Globe, color: 'text-azure' },
                    { label: 'Nódulos Ativos', value: stats.activeNodes, icon: Database, color: 'text-emerald-500' },
                    { label: 'Disponibilidade', value: stats.uptime, icon: Zap, color: 'text-amber-500' },
                    { label: 'Documentos Gerados', value: stats.docsGenerated, icon: FileText, color: 'text-rose-500' }
                ].map((m, i) => (
                    <div key={i} className="premium-glass p-8 rounded-[2.5rem] border border-white/5 group hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <m.icon className={`${m.color} opacity-50`} size={24} />
                            <ArrowUpRight size={16} className="text-slate-700 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.label}</p>
                        <h3 className="text-4xl font-black italic tracking-tighter">{m.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LIVE TRAFFIC CHART (CONCEPTUAL) */}
                <div className="lg:col-span-2 premium-glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <Zap size={18} className="text-gold" />
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Fluxo de Dados em Tempo Real</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-mono text-emerald-500 uppercase font-black">Live</span>
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-2 px-2">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="flex-1 bg-azure/20 hover:bg-azure transition-all rounded-t-lg relative group cursor-crosshair"
                                style={{ height: `${20 + Math.random() * 80}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {Math.floor(Math.random() * 500)} req
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-6 text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                        <span>00:00h</span>
                        <span>06:00h</span>
                        <span>12:00h</span>
                        <span>18:00h</span>
                        <span>23:59h</span>
                    </div>
                </div>

                {/* AUDIT LOGS */}
                <div className="premium-glass p-8 rounded-[3rem] border border-white/5 flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <Database size={18} className="text-azure" />
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Log de Auditoria Forense</h3>
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto max-h-[300px] pr-4 custom-scrollbar">
                        {logs.map(log => (
                            <div key={log.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-azure transition-colors mt-1.5" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-black text-white tracking-widest">{log.event}</span>
                                        <span className="text-[8px] font-mono text-slate-600 uppercase">{log.time}</span>
                                    </div>
                                    <p className="text-[9px] font-mono text-slate-500 truncate">Source: {log.ip} &bull; Node: {log.node}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="w-full mt-8 py-4 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-slate-500 hover:text-white">
                        Exportar Relatório Mensal
                    </button>
                </div>
            </div>
        </div>
    );
};
