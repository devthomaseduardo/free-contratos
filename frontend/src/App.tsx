import React, { useEffect, useState } from 'react';
import { ContractForm } from './components/ContractForm';
import { ContractPreview } from './components/ContractPreview';
import { Sidebar } from './components/Sidebar';
import { ContractData, INITIAL_CONTRACT_DATA, DocumentType } from './types';
import { Menu, Save } from 'lucide-react';

const STORAGE_KEY = 'contractforge_data_v2';

const App: React.FC = () => {
  const [contractData, setContractData] = useState<ContractData>(INITIAL_CONTRACT_DATA);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<ContractData>;
        setContractData({ ...INITIAL_CONTRACT_DATA, ...parsed });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contractData));
      setLastSaved(new Date());
    }, 1000);
    return () => clearTimeout(timer);
  }, [contractData]);

  const handleReset = () => {
    if (window.confirm('Resetar todos os dados?')) {
      setContractData({ ...INITIAL_CONTRACT_DATA, type: contractData.type });
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleTypeChange = (type: DocumentType) => {
    setContractData({ ...contractData, type });
    setSidebarOpen(false);
  };

  const docTitle = () => {
    const t = contractData.type;
    if (t === 'contract') return 'Contrato';
    if (t === 'nda') return 'NDA';
    if (t === 'quote') return 'Orçamento';
    if (t === 'invoice') return 'Nota Fiscal';
    if (t === 'declaration') return 'Declaração';
    if (t === 'letter') return 'Papel Timbrado';
    if (t === 'coverLetter') return 'Carta de apresentação';
    return 'Currículo';
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-100 font-sans flex overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar currentType={contractData.type} onSelect={handleTypeChange} />
      </div>

      <div className="flex-1 flex flex-col h-full min-w-0">
        <header className="h-16 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 -ml-2"
              aria-label="Abrir menu"
            >
              <Menu />
            </button>
            <h1 className="font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
              {docTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {lastSaved && (
              <span className="text-xs text-slate-500 hidden md:flex items-center gap-1">
                <Save size={12} aria-hidden /> Salvo {lastSaved.toLocaleTimeString('pt-BR')}
              </span>
            )}

            <div className="flex bg-slate-800 rounded p-1 md:hidden">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'form' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'preview' ? 'bg-neon-green text-black' : 'text-slate-400'}`}
              >
                Ver
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <div
            className={`flex-1 overflow-y-auto border-r border-slate-800 bg-slate-950 ${activeTab === 'form' ? 'block' : 'hidden md:block'}`}
          >
            <ContractForm data={contractData} onChange={setContractData} onReset={handleReset} />
          </div>

          <div className={`flex-1 bg-slate-900 relative ${activeTab === 'preview' ? 'block' : 'hidden md:block'}`}>
            <div className="absolute inset-0 bg-slate-900 z-0" />
            <div className="relative z-10 h-full">
              <ContractPreview data={contractData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
