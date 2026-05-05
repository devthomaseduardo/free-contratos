import React, { useEffect, useState } from 'react';
import { ContractForm } from './components/ContractForm';
import { ContractPreview } from './components/ContractPreview';
import { Sidebar } from './components/Sidebar';
import { ATSAnalyzer } from './components/ATSAnalyzer';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { TechnologyPage } from './components/TechnologyPage';
import { SecurityPage } from './components/SecurityPage';
import { EnterprisePage } from './components/EnterprisePage';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { DeveloperPage } from './components/DeveloperPage';
import { auth, logout } from './firebase';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';

import { INITIAL_CONTRACT_DATA } from './types';
import { DEMO_DATA } from './demoData';
import { Menu, Save, Trash2, FileText, Eye, History, ShieldCheck, AlertTriangle, Target, Fingerprint, HelpCircle, X } from 'lucide-react';

import { getClients, saveClient as apiSaveClient, deleteClient as apiDeleteClient, getDocuments as apiGetDocs, saveDocument as apiSaveDoc, deleteDocument as apiDeleteDoc } from './services/api';

import { useRef } from 'react';

const STORAGE_KEY = 'papercontracts_current_v1';
const HISTORY_KEY = 'papercontracts_history_v1';

const App = () => {
  const [isDemoActive, setIsDemoActive] = useState(() => localStorage.getItem('paper_demo_active') === 'true');
  const [currentView, setCurrentView] = useState('home'); 
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [contractData, setContractData] = useState(INITIAL_CONTRACT_DATA);

  useEffect(() => {
    getRedirectResult(auth).catch(err => console.error("Redirect login error:", err));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setIsDemoActive(true);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

   const handleAccessDemo = () => {
     setIsDemoActive(true);
     localStorage.setItem('paper_demo_active', 'true');
   };

  const handleLogout = async () => {
    await logout();
    setIsDemoActive(false);
    localStorage.removeItem('paper_demo_active');
  };

  const [history, setHistory] = useState([]);
  const [cloudHistory, setCloudHistory] = useState([]);
  const [clientProfiles, setClientProfiles] = useState([]);
  const [activeTab, setActiveTab] = useState('form');
  const [lastSaved, setLastSaved] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState(null);
   const [showAtsAnalyzer, setShowAtsAnalyzer] = useState(false);
   const [showOnboarding, setShowOnboarding] = useState(false);
   const [tourStep, setTourStep] = useState(0);
   const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

   const showConfirm = (title, message, onConfirm) => {
     setConfirmConfig({ isOpen: true, title, message, onConfirm });
   };

   const tourSteps = [
     {
       title: "O Cockpit Forense",
       desc: "Bem-vindo ao seu centro de comando. Aqui você gerencia protocolos, analisa admissibilidade e exporta documentos de alto padrão.",
       target: "header"
     },
     {
       title: "Instrumentação de Dados",
       desc: "Monitore a integridade do seu documento em tempo real através dos indicadores de segurança e densidade semântica.",
       target: "dashboard"
     },
     {
       title: "Inteligência Gemini 1.5",
       desc: "Utilize o motor de processamento neural para refinar cláusulas e garantir autoridade técnica em cada linha.",
       target: "editor"
     },
     {
       title: "Simulador ATS",
       desc: "Valide se o seu documento passará pelos filtros de triagem automatizada com nossa análise de admissibilidade.",
       target: "ats"
     }
   ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContractData({ ...INITIAL_CONTRACT_DATA, ...parsed });
      } catch (e) {
        console.error(e);
      }
    }

    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setClientProfiles([]);
      setCloudHistory([]);
      return;
    }

    const loadAppData = async () => {
      try {
        const [clients, docs] = await Promise.all([
            getClients().catch(() => []),
            apiGetDocs().catch(() => [])
        ]);
        setClientProfiles(clients);
        setCloudHistory(docs);
      } catch (e) {
        if (!e.message.includes('Unauthorized')) {
          console.error('Error loading app data:', e);
        }
      }
    };
    loadAppData();
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    
    const protectedViews = ['analytics', 'dev'];
    if (protectedViews.includes(currentView) && !user) {
      showToast('Acesso negado: Requer autenticação forense.', 'error');
      setCurrentView('home');
    }
  }, [currentView, user, authLoading]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contractData));
      setLastSaved(new Date());
    }, 1000);
    return () => clearTimeout(timer);
  }, [contractData]);

  const handleReset = () => {
    showConfirm(
      'Resetar Protocolo', 
      'Tem certeza que deseja expurgar todos os dados atuais? Esta ação não pode ser desfeita.', 
      () => {
        setContractData({ ...INITIAL_CONTRACT_DATA, type: contractData.type });
        localStorage.removeItem(STORAGE_KEY);
        showToast('Sistema resetado com sucesso.');
      }
    );
  };

  const loadDemoData = () => {
    const demo = DEMO_DATA[contractData.type] || DEMO_DATA.cv;
    setContractData(demo);
    showToast('Simulação forense carregada!');
  };

  const handleTypeChange = (type) => {
    setContractData({ ...contractData, type });
    setSidebarOpen(false);
    setShowHistory(false);
  };

  const saveToHistory = async () => {
    const id = Math.random().toString(36).substr(2, 9);
    const newDoc = {
      ...contractData,
      id: id,
      savedAt: new Date().toISOString(),
      name: contractData.contractTitle || contractData.clientName || 'Documento sem nome'
    };
    
    const updatedHistory = [newDoc, ...history];
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    
    if (user) {
        try {
            const savedDoc = await apiSaveDoc({
                id: id,
                title: newDoc.name,
                type: newDoc.type,
                content: contractData
            });
            setCloudHistory(prev => [savedDoc, ...prev]);
            showToast('Documento salvo na nuvem!');
        } catch (e) {
            console.error('Cloud save failed:', e);
            showToast('Salvo localmente (Erro na nuvem)', 'info');
        }
    } else {
        showToast('Documento salvo no histórico local!');
    }
  };

  const saveClientProfile = async (client) => {
    try {
        await apiSaveClient(client);
        setClientProfiles(prev => [...prev.filter(c => c.clientDoc !== client.clientDoc), client]);
        showToast('Perfil do cliente salvo no banco de dados!');
    } catch (e) {
        showToast('Erro ao salvar cliente: ' + e.message, 'error');
    }
  };

  const deleteClientProfile = async (doc) => {
    showConfirm(
      'Remover Perfil',
      'Excluir perfil deste cliente permanentemente do banco de dados?',
      async () => {
        try {
            await apiDeleteClient(doc);
            setClientProfiles(prev => prev.filter(c => c.clientDoc !== doc));
            showToast('Perfil excluído com sucesso!');
        } catch (e) {
            showToast('Erro ao excluir cliente: ' + e.message, 'error');
        }
      }
    );
  }

  const loadFromHistory = (doc) => {
    showConfirm(
      'Carregar Dossiê',
      'Carregar este documento do histórico local? Isso substituirá os dados atuais.',
      () => {
        setContractData(doc);
        setShowHistory(false);
        showToast('Documento carregado.');
      }
    );
  };

  const deleteFromHistory = (id) => {
    showConfirm(
      'Purgar Registro',
      'Excluir este documento permanentemente do histórico local?',
      () => {
        const updatedHistory = history.filter(d => d.id !== id);
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
        showToast('Registro purgado.');
      }
    );
  };

  const exportData = () => {
    const data = {
      current: contractData,
      history: history
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contractforge_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.history) {
          setHistory(parsed.history);
          localStorage.setItem(HISTORY_KEY, JSON.stringify(parsed.history));
        }
        if (parsed.current) {
          setContractData(parsed.current);
        }
        showToast('Dados importados com sucesso!');
      } catch (err) {
        showToast('Erro ao importar arquivo.', 'error');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  const calculateScore = () => {
    let score = 0;
    const d = contractData;
    if (d.contractorName) score += 5;
    if (d.contractorRole) score += 5;
    if (d.contractorLocation) score += 5;
    if (d.contractorLogo) score += 5;
    if (d.contractorContact) score += 5;
    if (d.contractorLinkedin) score += 5;
    if (d.contractorGithub) score += 5;
    if (d.contractorPortfolio) score += 5;
    if (d.type === 'cv') {
        if (d.cvExperience?.length > 100) score += 10;
        if (d.cvProjects?.length > 50) score += 10;
        if (d.cvSkills?.length > 10) score += 10;
        if (d.cvEducation?.length > 30) score += 10;
    } else {
        if (d.letterBody?.length > 200) score += 20;
        if (d.letterSubject?.length > 10) score += 10;
        if (d.coverLetterObjective?.length > 20) score += 10;
    }
    if (d.status === 'final' || d.status === 'paid') score += 20;
    return Math.min(score, 100);
  };

  const docTitle = () => {
    const t = contractData.type;
    if (t === 'contract') return 'Acordo Vinculativo';
    if (t === 'nda') return 'Protocolo de Sigilo';
    if (t === 'quote') return 'Proposta de Valor';
    if (t === 'invoice') return 'Extrato de Liquidação';
    if (t === 'declaration') return 'Atestado de Fé Pública';
    if (t === 'letter') return 'Correspondência Oficial';
    if (t === 'coverLetter') return 'Carta de Impacto';
    return 'Dossiê Estratégico';
  };

  if (authLoading) {
    return (
      <div className="h-screen bg-midnight flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-t-2 border-azure rounded-full animate-spin" />
          <Fingerprint size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-azure/50" />
        </div>
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] animate-pulse">Autenticando</span>
            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Paper Contracts Engine v3.0</span>
        </div>
      </div>
    );
  }

  if (!isDemoActive && !user) {
    if (currentView === 'login') {
      return <LoginPage onBack={() => setCurrentView('home')} onLoginSuccess={() => setIsDemoActive(true)} />;
    }
    if (currentView === 'tech') return <TechnologyPage onBack={() => setCurrentView('home')} />;
    if (currentView === 'sec') return <SecurityPage onBack={() => setCurrentView('home')} />;
    if (currentView === 'ent') return <EnterprisePage onBack={() => setCurrentView('home')} />;
    if (currentView === 'analytics') return <AnalyticsDashboard onBack={() => setCurrentView('home')} />;
    if (currentView === 'dev') return <DeveloperPage onBack={() => setCurrentView('home')} />;
    return <HomePage onAccessDemo={handleAccessDemo} onNavigate={(view) => setCurrentView(view)} />;
  }

  const loadFromCloud = (doc) => {
    showConfirm('Sincronizar Nuvem', `Carregar o dossiê "${doc.title}"? Isso substituirá os dados atuais.`, () => {
        setContractData(doc.content);
        showToast('Dossiê carregado da nuvem!');
        if (window.innerWidth < 1024) setSidebarOpen(false);
    });
  };

  const deleteFromCloud = async (id) => {
    showConfirm('Excluir da Nuvem', 'Excluir este dossiê permanentemente do servidor central?', async () => {
        try {
            await apiDeleteDoc(id);
            setCloudHistory(prev => prev.filter(d => d.id !== id));
            showToast('Dossiê excluído da nuvem!');
        } catch (e) {
            showToast('Erro ao excluir: ' + e.message, 'error');
        }
    });
  };

  return (
    <div className="h-screen bg-midnight text-slate-100 font-sans flex overflow-hidden selection:bg-azure/30 print:h-auto print:overflow-visible print:bg-white">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden animate-in fade-in duration-300 print:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="print:hidden">
        <Sidebar 
          currentType={contractData.type} onSelect={handleTypeChange} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}
          user={user} onLogout={handleLogout} onViewAnalytics={() => setCurrentView('analytics')}
          cloudHistory={cloudHistory} onLoadCloud={loadFromCloud} onDeleteCloud={deleteFromCloud}
        />
      </div>

      <div className="flex-1 flex flex-col h-full min-w-0 pb-20 md:pb-0 relative print:h-auto print:pb-0">
        <header className="h-16 sm:h-20 lg:h-24 px-3 sm:px-6 lg:px-10 flex items-center justify-between border-b border-white/[0.03] bg-black/40 backdrop-blur-3xl sticky top-0 z-[60] print:hidden transition-all duration-500">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white p-2.5 sm:p-3 bg-white/5 hover:bg-white/10 rounded-xl sm:rounded-2xl transition-colors border border-white/5 shrink-0"><Menu size={18} className="sm:hidden" /><Menu size={20} className="hidden sm:block" /></button>
            <div className="hidden md:flex flex-col items-end border-r border-white/5 pr-6 lg:pr-10 py-1">
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] mb-1">Node ID</span>
                <span className="text-[11px] font-mono text-azure/80 font-bold tracking-tighter">PHNX-0128-TX</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                 <h2 className="text-sm sm:text-xl lg:text-2xl font-black text-white uppercase tracking-tighter leading-none truncate">{showAtsAnalyzer ? 'Simulador ATS' : docTitle()}</h2>
                 {showAtsAnalyzer && <button onClick={() => setShowAtsAnalyzer(false)} className="ml-1 sm:ml-2 text-[8px] sm:text-[9px] bg-rose-500/10 text-rose-500 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all uppercase font-black tracking-widest shrink-0">Sair</button>}
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                 <div className="flex items-center gap-1 sm:gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" /><span className="text-[7px] sm:text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">Camada 02 Ativa</span></div>
                 <span className="hidden lg:inline text-[9px] text-slate-700 font-bold uppercase tracking-widest border-l border-white/10 pl-3">v.3.2.0-STABLE</span>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-10">
             <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between"><span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Integridade Semântica</span><span className={`text-[10px] font-mono font-black ${calculateScore() > 80 ? 'text-emerald-500' : calculateScore() > 50 ? 'text-amber-500' : 'text-rose-500'}`}>{calculateScore()}%</span></div>
                <div className="w-40 h-1 bg-white/5 rounded-full overflow-hidden"><div className={`h-full transition-all duration-1000 ${calculateScore() > 80 ? 'bg-emerald-500' : calculateScore() > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${calculateScore()}%` }} /></div>
             </div>
             {lastSaved && (
               <div className="flex flex-col items-end border-l border-white/5 pl-10"><span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Último Sinc</span><span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase">{lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span></div>
             )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-4 shrink-0">
            <button onClick={() => { setShowOnboarding(true); setTourStep(0); }} className="hidden sm:flex p-3 sm:p-3.5 bg-white/5 hover:bg-azure/10 text-slate-500 hover:text-azure rounded-xl sm:rounded-2xl border border-white/5 transition-all active:scale-95"><HelpCircle size={18} className="sm:hidden" /><HelpCircle size={20} className="hidden sm:block" /></button>
            <button onClick={() => setShowAtsAnalyzer(true)} className="hidden lg:flex p-3.5 bg-white/5 hover:bg-emerald-500/5 text-slate-500 hover:text-emerald-400 rounded-2xl border border-white/5 hover:border-emerald-500/10 transition-all active:scale-95"><Target size={20} /></button>
            <button onClick={() => window.print()} className="p-2.5 sm:p-3 lg:px-5 lg:py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 border border-white/10 active:scale-95 shadow-lg"><FileText size={16} className="sm:hidden text-azure" /><FileText size={18} className="hidden sm:block text-azure" /><span className="hidden xl:inline">Exportar PDF</span></button>
            <button onClick={saveToHistory} className="px-3 py-2.5 sm:px-5 sm:py-3 lg:px-6 bg-azure hover:bg-azure-dark text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 sm:gap-2.5 shadow-lg shadow-azure/10 active:scale-95 group border border-azure/50"><Save size={16} className="sm:hidden group-hover:scale-110 transition-transform" /><Save size={18} className="hidden sm:block group-hover:scale-110 transition-transform" /><span className="hidden sm:inline">Salvar Protocolo</span><span className="sm:hidden">Salvar</span></button>
          </div>
        </header>

        <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 bg-midnight-lighter/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 sm:px-8 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.4)] print:hidden safe-area-pb">
            <button onClick={() => { setActiveTab('form'); setShowHistory(false); }} className={`flex flex-col items-center gap-1 sm:gap-1.5 transition-all ${activeTab === 'form' && !showHistory ? 'text-azure scale-105' : 'text-slate-500'}`}><div className={`p-2 sm:p-2.5 rounded-xl transition-colors ${activeTab === 'form' && !showHistory ? 'bg-azure/10' : ''}`}><FileText size={20} /></div><span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Editor</span></button>
            <button onClick={() => { setActiveTab('preview'); setShowHistory(false); }} className={`flex flex-col items-center gap-1 sm:gap-1.5 transition-all ${activeTab === 'preview' ? 'text-azure scale-105' : 'text-slate-500'}`}><div className={`p-2 sm:p-2.5 rounded-xl transition-colors ${activeTab === 'preview' ? 'bg-azure/10' : ''}`}><Eye size={20} /></div><span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Preview</span></button>
            <button onClick={() => setShowHistory(true)} className={`flex flex-col items-center gap-1 sm:gap-1.5 transition-all ${showHistory ? 'text-azure scale-105' : 'text-slate-500'}`}><div className={`p-2 sm:p-2.5 rounded-xl transition-colors ${showHistory ? 'bg-azure/10' : ''}`}><History size={20} /></div><span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Arquivo</span></button>
        </div>

        <main className="flex-1 flex gap-2 sm:gap-4 lg:gap-8 p-2 sm:p-4 lg:p-10 overflow-hidden print:overflow-visible print:block bg-[#020408]">
          <div className={`flex-1 overflow-y-auto border border-white/5 bg-slate-950/50 backdrop-blur-3xl rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] transition-all custom-scrollbar print:hidden shadow-2xl ${activeTab === 'form' ? 'block' : 'hidden md:block'}`}>
            {showAtsAnalyzer ? <ATSAnalyzer cvData={contractData} onClose={() => setShowAtsAnalyzer(false)} /> : showHistory ? (
              <div className="p-8 lg:p-12 animate-in-scale">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div><h2 className="text-3xl font-black text-white tracking-tighter">Dashboard</h2><p className="text-slate-500 text-sm mt-1">Gerencie seus documentos locais.</p></div>
                  <div className="flex items-center gap-3"><button onClick={exportData} className="text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-slate-300 px-4 py-2 rounded-xl border border-slate-800 transition-all">Exportar</button><label className="text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-slate-300 px-4 py-2 rounded-xl border border-slate-800 transition-all cursor-pointer">Importar<input type="file" className="hidden" accept=".json" onChange={importData} /></label><button onClick={() => setShowHistory(false)} className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Voltar</button></div>
                </div>
                {history.length === 0 ? <div className="flex flex-col items-center justify-center py-32 premium-glass rounded-[2.5rem] border-dashed border-2 border-white/5"><div className="p-5 bg-white/[0.03] rounded-3xl mb-6"><FileText size={40} className="text-slate-600" /></div><p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Sua biblioteca está vazia</p></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{history.map(doc => (<div key={doc.id} className="premium-glass group rounded-[2rem] p-8 hover:bg-white/[0.05] transition-all relative overflow-hidden flex flex-col h-full"><div className="flex justify-between items-start mb-6"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{doc.type}</span><button onClick={() => deleteFromHistory(doc.id)} className="p-2 text-slate-600 hover:text-rose-500 rounded-xl transition-all"><Trash2 size={18} /></button></div><h3 className="font-black text-white truncate mb-2 text-xl tracking-tighter">{doc.name}</h3><p className="text-[11px] text-slate-500 mb-8 font-bold uppercase tracking-widest">{new Date(doc.savedAt).toLocaleDateString('pt-BR')} &bull; {new Date(doc.savedAt).toLocaleTimeString('pt-BR')}</p><div className="mt-auto"><button onClick={() => loadFromHistory(doc)} className="w-full py-4 bg-white/5 hover:bg-azure hover:text-white text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all border border-white/10">Abrir Documento</button></div></div>))}</div>}
              </div>
            ) : <ContractForm data={contractData} onChange={setContractData} onReset={handleReset} onLoadDemo={loadDemoData} clientProfiles={clientProfiles} onSaveClient={saveClientProfile} onDeleteClient={deleteClientProfile} onNotify={showToast} />}
          </div>

          <div className={`flex-1 bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] relative transition-all custom-scrollbar overflow-y-auto print:bg-white print:overflow-visible print:block shadow-2xl ${activeTab === 'preview' ? 'block' : 'hidden md:block'} ${showAtsAnalyzer ? '!hidden' : ''}`}>
            {!showAtsAnalyzer && <><div className="absolute inset-0 bg-slate-900 z-0 print:hidden" /><div className="relative z-10 h-full print:h-auto"><ContractPreview data={contractData} onChange={(updates) => setContractData(prev => ({ ...prev, ...updates }))} /></div></>}
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed top-20 right-6 left-6 md:left-auto md:w-80 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${toast.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}><div className={`p-2 rounded-xl ${toast.type === 'error' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>{toast.type === 'error' ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}</div><span className="text-xs font-black uppercase tracking-widest">{toast.message}</span></div>
        </div>
      )}

      {showOnboarding && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500"><div className="premium-glass max-w-lg w-full p-12 rounded-[3rem] border border-white/10 relative overflow-hidden"><div className="relative z-10 space-y-8"><div className="flex items-center justify-between"><span className="text-[10px] font-black text-azure uppercase tracking-[0.5em]">Passo {tourStep + 1} de {tourSteps.length}</span><button onClick={() => setShowOnboarding(false)} className="text-slate-500 hover:text-white"><X size={20} /></button></div><div className="space-y-4"><h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{tourSteps[tourStep].title}</h3><p className="text-slate-400 leading-relaxed font-medium uppercase tracking-widest text-xs">{tourSteps[tourStep].desc}</p></div><div className="flex gap-4 pt-6">{tourStep > 0 && <button onClick={() => setTourStep(prev => prev - 1)} className="flex-1 py-4 bg-white/5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Anterior</button>}<button onClick={() => { if (tourStep < tourSteps.length - 1) setTourStep(prev => prev + 1); else setShowOnboarding(false); }} className="flex-[2] py-4 bg-azure text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-azure/20">{tourStep === tourSteps.length - 1 ? 'Finalizar' : 'Próximo'}</button></div></div></div></div>
      )}

      {confirmConfig.isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500"><div className="relative max-w-sm w-full animate-in zoom-in-95 duration-300"><div className="premium-glass p-8 rounded-[2rem] border border-white/10 relative overflow-hidden"><div className="relative z-10 space-y-6"><div className="flex items-center justify-between border-b border-white/5 pb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-azure/10 rounded-xl flex items-center justify-center animate-pulse"><ShieldCheck size={20} className="text-azure" /></div><div className="flex flex-col"><span className="text-[8px] font-black text-azure uppercase tracking-[0.4em]">Ação Requerida</span><h3 className="text-sm font-black text-white uppercase tracking-widest">{confirmConfig.title}</h3></div></div></div><div className="py-2"><p className="text-[11px] text-slate-400 leading-relaxed font-bold uppercase tracking-widest text-center">{confirmConfig.message}</p></div><div className="grid grid-cols-2 gap-3 pt-2"><button onClick={() => setConfirmConfig({ ...confirmConfig, isOpen: false })} className="py-3.5 bg-white/5 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Abortar</button><button onClick={() => { confirmConfig.onConfirm(); setConfirmConfig({ ...confirmConfig, isOpen: false }); }} className="py-3.5 bg-azure text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-azure/20">Confirmar</button></div></div></div></div></div>
      )}
    </div>
  );
};

export default App;
