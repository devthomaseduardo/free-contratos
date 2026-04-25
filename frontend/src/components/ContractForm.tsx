
import React, { useState, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ContractData, DocumentItem, DocumentStatus } from '../types';
import { Input, TextArea } from './ui/Input';
import { Sparkles, Plus, Trash2, Bot, Eraser, ChevronDown, ChevronUp, Briefcase, User, Wallet, Scale, PenTool, Image as ImageIcon, Globe, Smartphone, Wrench, Zap, Infinity } from 'lucide-react';
import { refineServiceDescription, generateLegalClause } from '../services/api';

interface ContractFormProps {
  data: ContractData;
  onChange: (newData: ContractData) => void;
  onReset: () => void;
}

type SectionKey = 'parties' | 'details' | 'financial' | 'legal' | 'signature';

const sectionHeaderClasses: Record<SectionKey, { active: string; idle: string }> = {
  parties: {
    active: 'bg-slate-800/90 border-indigo-500/70 shadow-lg shadow-indigo-500/10',
    idle: 'bg-slate-900/50 border-slate-700 hover:border-indigo-500/40 hover:bg-slate-800/40',
  },
  details: {
    active: 'bg-slate-800/90 border-emerald-500/70 shadow-lg shadow-emerald-500/10',
    idle: 'bg-slate-900/50 border-slate-700 hover:border-emerald-500/40 hover:bg-slate-800/40',
  },
  financial: {
    active: 'bg-slate-800/90 border-amber-500/70 shadow-lg shadow-amber-500/10',
    idle: 'bg-slate-900/50 border-slate-700 hover:border-amber-500/40 hover:bg-slate-800/40',
  },
  legal: {
    active: 'bg-slate-800/90 border-rose-500/70 shadow-lg shadow-rose-500/10',
    idle: 'bg-slate-900/50 border-slate-700 hover:border-rose-500/40 hover:bg-slate-800/40',
  },
  signature: {
    active: 'bg-slate-800/90 border-sky-500/70 shadow-lg shadow-sky-500/10',
    idle: 'bg-slate-900/50 border-slate-700 hover:border-sky-500/40 hover:bg-slate-800/40',
  },
};

const SERVICE_TEMPLATES = [
  {
      id: 'universal',
      label: 'Modelo Universal',
      icon: Infinity,
      services: [
        'Criação de Landing Pages e Sites Institucionais',
        'Desenvolvimento de E-commerces e Sistemas Web',
        'Otimização de SEO e Performance',
        'Manutenção e Suporte Técnico'
      ],
      clauses: ''
  },
  {
    id: 'web',
    label: 'Site / Landing Page',
    icon: Globe,
    services: [
      'Desenvolvimento de Interface (UI/UX) Responsiva',
      'Implementação Front-end com React/Next.js e Tailwind CSS',
      'Otimização de Performance (Core Web Vitals) e SEO Técnico Básico',
      'Configuração de Domínio e Hospedagem (Vercel/Netlify)',
      'Integração com WhatsApp e Formulários de Contato'
    ],
    clauses: `CLÁUSULA TÉCNICA - HOSPEDAGEM E DOMÍNIO:
A contratação e pagamento de domínio e hospedagem são de responsabilidade exclusiva do CONTRATANTE. O CONTRATADO prestará suporte na configuração inicial, mas não se responsabiliza por renovações futuras ou falhas nos servidores de terceiros.

COMPATIBILIDADE DE NAVEGADORES:
O projeto será compatível com as duas versões mais recentes dos navegadores Google Chrome, Safari, Firefox e Edge. Não há suporte garantido para versões antigas ou descontinuadas (ex: Internet Explorer).`
  },
  {
    id: 'app',
    label: 'App Mobile',
    icon: Smartphone,
    services: [
      'Design de Telas (Figma) e Prototipação de Alta Fidelidade',
      'Desenvolvimento Híbrido (React Native/Flutter) para Android e iOS',
      'Integração com APIs RESTful e Banco de Dados Local',
      'Testes de Usabilidade e Performance em Dispositivos Reais',
      'Compilação e Submissão para Apple App Store e Google Play Store'
    ],
    clauses: `CLÁUSULA DE PUBLICAÇÃO EM LOJAS:
O CONTRATADO realizará o processo técnico de submissão do aplicativo nas lojas (Apple Store e Google Play). O CONTRATANTE declara estar ciente de que é responsável pelas taxas anuais ou únicas cobradas pelas plataformas (Apple Developer Program / Google Play Console).

APROVAÇÃO NAS LOJAS:
O CONTRATADO adequará o aplicativo às diretrizes técnicas vigentes, porém a aprovação final depende exclusivamente da Apple e Google. Caso o modelo de negócio do CONTRATANTE infrinja regras das plataformas, o CONTRATADO não poderá ser responsabilizado pela rejeição.`
  },
  {
    id: 'maintenance',
    label: 'Manutenção Mensal',
    icon: Wrench,
    services: [
      'Monitoramento de Uptime e Disponibilidade (24/7)',
      'Backup Semanal de Banco de Dados e Arquivos',
      'Atualização de Plugins, Dependências e Patches de Segurança',
      'Correção de Bugs Críticos (Hotfixes) em até 24h',
      'Suporte Técnico via Email/WhatsApp (Horário Comercial)'
    ],
    clauses: `SLA (ACORDO DE NÍVEL DE SERVIÇO):
O tempo de resposta para chamados críticos é de até 24 horas úteis. Solicitações de novas funcionalidades, alterações de layout ou criação de novas páginas não estão inclusas na manutenção e serão orçadas separadamente como horas extras.

VIGÊNCIA E CANCELAMENTO:
Este contrato de manutenção tem renovação automática mensal. Pode ser cancelado por qualquer uma das partes mediante aviso prévio de 30 dias, sem multa rescisória após o período de fidelidade (se houver).`
  },
  {
    id: 'consulting',
    label: 'Consultoria Tech',
    icon: Zap,
    services: [
      'Análise e Definição de Arquitetura de Software Escalável',
      'Code Review (Revisão de Código) e Auditoria de Qualidade',
      'Otimização de Performance de Banco de Dados e Queries',
      'Mentoria Técnica para a Equipe Interna',
      'Documentação Técnica do Sistema'
    ],
    clauses: `NATUREZA DA CONSULTORIA:
O serviço limita-se à orientação estratégica, análise técnica e recomendação de soluções. A execução operacional de código rotineiro ("mão na massa") permanece sob responsabilidade da equipe interna do CONTRATANTE, salvo acordo específico em contrário descrito no escopo.

PROPRIEDADE INTELECTUAL:
Relatórios, diagramas e documentos produzidos durante a consultoria tornam-se propriedade do CONTRATANTE após o pagamento integral.`
  }
];

export const ContractForm: React.FC<ContractFormProps> = ({ data, onChange, onReset }) => {
  const [activeSection, setActiveSection] = useState<SectionKey>('parties');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isClauseLoading, setIsClauseLoading] = useState(false);
  
  // Local inputs
  const [newService, setNewService] = useState('');
  const [clausePrompt, setClausePrompt] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');
  const [newSkill, setNewSkill] = useState('');

  const signatureInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ContractData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  // --- LOGIC HANDLERS ---
  const handleServiceAdd = () => {
    if (newService.trim()) {
      onChange({ ...data, services: [...data.services, newService] });
      setNewService('');
    }
  };

  const handleApplyTemplate = (template: typeof SERVICE_TEMPLATES[0]) => {
      if (confirm(`Aplicar o modelo "${template.label}"?\nIsso substituirá os serviços atuais e adicionará as cláusulas específicas.`)) {
          onChange({
              ...data,
              services: template.services,
              extraClauses: template.clauses // Or append: (data.extraClauses ? data.extraClauses + "\n\n" : "") + template.clauses
          });
      }
  };
  
  const handleAiImprove = async () => {
    if (!newService.trim()) return;
    setIsAiLoading(true);
    try {
      const refined = await refineServiceDescription(newService);
      onChange({ ...data, services: [...data.services, ...refined] });
      setNewService('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateClause = async () => {
    if (!clausePrompt.trim()) return;
    setIsClauseLoading(true);
    try {
      const clause = await generateLegalClause(clausePrompt);
      if (clause.startsWith('Erro:') || clause.startsWith('Erro ao')) {
        console.error(clause);
        return;
      }
      const currentClauses = data.extraClauses ? data.extraClauses + "\n\n" : "";
      onChange({ ...data, extraClauses: currentClauses + clause });
      setClausePrompt('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsClauseLoading(false);
    }
  };

  const handleQuoteAdd = () => {
    if (newItemDesc.trim() && newItemPrice) {
        const item: DocumentItem = {
            id: Math.random().toString(36).substr(2, 9),
            description: newItemDesc,
            quantity: Number(newItemQty),
            unitPrice: parseFloat(newItemPrice.replace(',', '.'))
        };
        onChange({ ...data, quoteItems: [...data.quoteItems, item] });
        setNewItemDesc('');
        setNewItemPrice('');
        setNewItemQty('1');
    }
  };

  const handleSkillAdd = () => {
    if (newSkill.trim()) {
      onChange({ ...data, cvSkills: [...data.cvSkills, newSkill] });
      setNewSkill('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'contractorSignature' | 'contractorLogo') => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              handleChange(field, reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleDeclarationTemplate = (type: 'hours' | 'service' | 'residence' | 'vinculo') => {
    let subject = '';
    let body = '';
    
    if (type === 'hours') {
        subject = 'Declaração de Horas Trabalhadas';
        body = `Declaramos para os devidos fins que ${data.contractorName}, inscrito no CPF ${data.contractorDoc}, prestou serviços de desenvolvimento de software no período de [DATA INICIO] a [DATA FIM], totalizando [TOTAL] horas de trabalho dedicadas ao projeto.`;
    } else if (type === 'service') {
        subject = 'Declaração de Prestação de Serviços';
        body = `Declaramos para os devidos fins de comprovação de renda e atividade que ${data.contractorName}, profissional autônomo na área de tecnologia, presta serviços de desenvolvimento de software para esta empresa de forma recorrente, recebendo mensalmente a quantia aproximada de R$ [VALOR].`;
    } else if (type === 'residence') {
        subject = 'Declaração de Residência';
        body = `Eu, ${data.contractorName}, inscrito no CPF ${data.contractorDoc}, declaro para os devidos fins que resido e sou domiciliado no endereço: ${data.contractorLocation}.`;
    } else if (type === 'vinculo') {
        subject = 'Declaração de Inexistência de Vínculo Empregatício';
        body = `Declaro, para os devidos fins, que presto serviços de natureza autônoma e eventual para [NOME DA EMPRESA], não havendo subordinação, habitualidade ou cumprimento de horário que caracterize vínculo empregatício nos moldes da CLT.`;
    }

    onChange({ ...data, letterSubject: subject, letterBody: body });
  };

  const handleCoverLetterTemplate = () => {
      onChange({
          ...data,
          letterSubject: "Apresentação: Desenvolvedor Fullstack Sênior",
          letterBody: "Prezados,\n\nAcompanho o trabalho da sua empresa há algum tempo e vejo grande potencial de otimização em suas plataformas digitais.\n\nCom minha experiência em React, Next.js e performance web, tenho certeza que posso ajudar a reduzir o tempo de carregamento e aumentar a conversão de seus produtos.",
          coverLetterObjective: "Aplicar técnicas de engenharia de software para escalar seus produtos digitais e melhorar a experiência do usuário.",
          coverLetterCta: "Tenho disponibilidade para uma call rápida na próxima terça-feira às 14h. Aguardo seu retorno."
      });
  }

  // --- RENDER HELPERS ---
  const SectionHeader = ({ id, title, icon: Icon }: { id: SectionKey; title: string; icon: LucideIcon }) => {
    const active = activeSection === id;
    const skin = sectionHeaderClasses[id];
    return (
      <button
        type="button"
        onClick={() => setActiveSection(id)}
        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
          active ? skin.active : skin.idle
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon size={22} className={active ? 'text-white shrink-0' : 'text-slate-500 shrink-0'} strokeWidth={2} />
          <span className={`font-bold truncate ${active ? 'text-white' : 'text-slate-300'}`}>{title}</span>
        </div>
        {active ? (
          <ChevronUp size={20} className="text-slate-400 shrink-0" aria-hidden />
        ) : (
          <ChevronDown size={20} className="text-slate-600 shrink-0" aria-hidden />
        )}
      </button>
    );
  };

  return (
    <div className="p-6 pb-32 space-y-4 max-w-4xl mx-auto">
      {/* STATUS BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1">
              {(['draft', 'pending', 'final', 'paid'] as DocumentStatus[]).map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleChange('status', s)}
                    className={`min-h-10 px-3.5 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                        data.status === s 
                        ? s === 'final' ? 'bg-emerald-500 text-white shadow-md' : s === 'pending' ? 'bg-amber-500 text-white shadow-md' : s === 'paid' ? 'bg-teal-500 text-white shadow-md' : 'bg-slate-700 text-white ring-1 ring-neon-purple/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                      {s === 'draft' ? 'Rascunho' : s === 'pending' ? 'Em Revisão' : s === 'paid' ? 'Pago' : 'Finalizado'}
                  </button>
              ))}
          </div>
          <button type="button" onClick={onReset} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/80 px-3 text-xs font-semibold text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/50 transition-colors sm:self-center">
            <Eraser size={16} aria-hidden /> <span>Limpar modelo</span>
          </button>
      </div>

      {/* 1. IDENTIFICAÇÃO — mesmo acordeão em todas as telas (layout clássico) */}
      <div className="space-y-2">
        <SectionHeader id="parties" title="Identificação & Branding" icon={User} />
        {activeSection === 'parties' && (
          <div className="p-5 bg-slate-900/30 border-l-2 border-indigo-500 rounded-r-xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 rounded-lg border border-dashed border-slate-600 flex items-center justify-center bg-slate-900 overflow-hidden shrink-0">
                {data.contractorLogo ? (
                  <img src={data.contractorLogo} className="w-full h-full object-contain" alt="" />
                ) : (
                  <ImageIcon className="text-slate-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-300 mb-1">Sua Logomarca</p>
                <p className="text-xs text-slate-500 mb-2">Exibida no topo dos documentos.</p>
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="text-xs bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-700 text-white"
                >
                  Carregar logo
                </button>
                <input type="file" ref={logoInputRef} onChange={(e) => handleImageUpload(e, 'contractorLogo')} className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs text-indigo-400 font-bold uppercase mb-2 block">Emissor (você)</label>
                <div className="grid md:grid-cols-2 gap-4 pl-3 border-l border-slate-700">
                  <Input label="Nome Completo" value={data.contractorName} onChange={(e) => handleChange('contractorName', e.target.value)} />
                  <Input label="Função / Cargo" value={data.contractorRole} onChange={(e) => handleChange('contractorRole', e.target.value)} />
                  <Input label="CPF / CNPJ" value={data.contractorDoc} onChange={(e) => handleChange('contractorDoc', e.target.value)} />
                  <Input label="Cidade — estado" value={data.contractorLocation} onChange={(e) => handleChange('contractorLocation', e.target.value)} />
                  <Input label="Contato" value={data.contractorContact} onChange={(e) => handleChange('contractorContact', e.target.value)} className="md:col-span-2" />
                </div>
              </div>

              {data.type !== 'cv' && (
                <div className="md:col-span-2 mt-4">
                  <label className="text-xs text-emerald-400 font-bold uppercase mb-2 block">Destinatário (cliente)</label>
                  <div className="grid md:grid-cols-2 gap-4 pl-3 border-l border-slate-700">
                    <Input label="Nome / razão social" value={data.clientName} onChange={(e) => handleChange('clientName', e.target.value)} />
                    <Input label="CPF / CNPJ" value={data.clientDoc} onChange={(e) => handleChange('clientDoc', e.target.value)} />
                    <Input label="Endereço completo" value={data.clientAddress} onChange={(e) => handleChange('clientAddress', e.target.value)} className="md:col-span-2" />
                    <Input label="CEP / telefone" value={data.clientZipPhone} onChange={(e) => handleChange('clientZipPhone', e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. DETALHES DO SERVIÇO / ITENS */}
      <div className="space-y-2">
        <SectionHeader 
            id="details" 
            title={data.type === 'cv' ? 'Experiência & Skills' : (data.type === 'letter' || data.type === 'declaration' || data.type === 'coverLetter') ? 'Conteúdo do Texto' : 'Escopo & Itens'} 
            icon={Briefcase} 
        />
        {activeSection === 'details' && (
             <div className="p-5 bg-slate-900/30 border-l-2 border-emerald-500 rounded-r-xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                
                {/* TEMPLATES QUICK ACCESS */}
                {data.type === 'contract' && (
                    <div className="mb-6">
                        <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3 block">Modelos Rápidos (Templates)</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {SERVICE_TEMPLATES.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => handleApplyTemplate(t)}
                                    className="flex flex-col items-center gap-2 p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-slate-800 rounded-xl transition-all group"
                                >
                                    <div className="p-2 bg-slate-950 rounded-lg text-emerald-500 group-hover:scale-110 transition-transform">
                                        <t.icon size={20} />
                                    </div>
                                    <span className="text-xs font-medium text-slate-400 group-hover:text-white text-center">{t.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="h-px bg-slate-800 my-6"></div>
                    </div>
                )}

                {/* CONTRATO */}
                {(data.type === 'contract' || data.type === 'nda') && (
                    <div className="space-y-4">
                        {data.type === 'contract' && (
                            <div className="flex gap-2 flex-col md:flex-row">
                                <input 
                                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="Descreva o serviço a ser prestado..."
                                    value={newService}
                                    onChange={(e) => setNewService(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleServiceAdd()}
                                />
                                <button onClick={handleServiceAdd} className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg text-white transition-colors"><Plus /></button>
                                <button onClick={handleAiImprove} disabled={isAiLoading} className="bg-indigo-600 hover:bg-indigo-500 px-4 rounded-lg text-white flex gap-2 items-center font-medium transition-colors">
                                    <Sparkles size={16} className={isAiLoading ? 'animate-spin' : ''}/> {isAiLoading ? 'Melhorando...' : 'IA Refine'}
                                </button>
                            </div>
                        )}
                        <div className="space-y-2">
                            {data.type === 'nda' && <p className="text-sm text-slate-400 italic mb-2">O NDA já possui cláusulas padrão de sigilo. Adicione serviços específicos se necessário para contextualizar.</p>}
                            {data.services.map((s, i) => (
                                <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800 group hover:border-slate-600 transition-colors">
                                    <span className="text-sm text-slate-300">{s}</span>
                                    <button onClick={() => {
                                        const updated = data.services.filter((_, idx) => idx !== i);
                                        handleChange('services', updated);
                                    }} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ORÇAMENTO e INVOICE */}
                {(data.type === 'quote' || data.type === 'invoice') && (
                    <div className="space-y-4">
                         <div className="grid grid-cols-12 gap-2 items-end bg-slate-950 p-4 rounded-lg border border-slate-800">
                            <div className="col-span-12 md:col-span-6">
                                <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block">Item / Serviço</label>
                                <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" value={newItemDesc} onChange={e => setNewItemDesc(e.target.value)} placeholder="Descrição" />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block">Qtd</label>
                                <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" type="number" value={newItemQty} onChange={e => setNewItemQty(e.target.value)} />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block">Preço Unit.</label>
                                <input className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" type="number" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} placeholder="0.00" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <button onClick={handleQuoteAdd} className="w-full h-[38px] bg-emerald-500 hover:bg-emerald-400 rounded flex items-center justify-center text-black"><Plus size={20} /></button>
                            </div>
                        </div>
                        <div className="space-y-1">
                            {data.quoteItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-900/50 p-2 rounded border border-slate-800 text-sm">
                                    <span className="col-span-6 md:col-span-7 font-medium">{item.description}</span>
                                    <span className="col-span-2 text-center text-slate-400">{item.quantity}</span>
                                    <span className="col-span-3 md:col-span-2 text-right text-emerald-400">R$ {item.unitPrice.toFixed(2)}</span>
                                    <button onClick={() => {
                                         handleChange('quoteItems', data.quoteItems.filter(i => i.id !== item.id));
                                    }} className="col-span-1 text-slate-600 hover:text-red-500 flex justify-end"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CV */}
                {data.type === 'cv' && (
                    <div className="space-y-4">
                        <TextArea label="Resumo Profissional" value={data.cvSummary} onChange={e => handleChange('cvSummary', e.target.value)} className="min-h-[100px]" />
                        <TextArea label="Experiência Profissional" value={data.cvExperience} onChange={e => handleChange('cvExperience', e.target.value)} className="min-h-[150px]" />
                        <TextArea label="Educação" value={data.cvEducation} onChange={e => handleChange('cvEducation', e.target.value)} className="min-h-[80px]" />
                        
                        <div>
                             <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold ml-1 mb-2 block">Skills</label>
                             <div className="flex gap-2 mb-3">
                                <input className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2" value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Adicionar habilidade..." onKeyDown={e => e.key === 'Enter' && handleSkillAdd()} />
                                <button onClick={handleSkillAdd} className="bg-sky-500 text-black px-4 rounded font-bold hover:bg-sky-400 transition-colors">Add</button>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                {data.cvSkills.map((skill, i) => (
                                    <span key={i} className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                                        {skill} <button onClick={() => {
                                            const updated = data.cvSkills.filter((_, idx) => idx !== i);
                                            handleChange('cvSkills', updated);
                                        }} className="text-slate-500 hover:text-white"><Trash2 size={10}/></button>
                                    </span>
                                ))}
                             </div>
                        </div>
                    </div>
                )}

                {/* CARTA & DECLARAÇÃO */}
                {(data.type === 'letter' || data.type === 'declaration') && (
                    <div className="space-y-4">
                        {data.type === 'declaration' && (
                            <div className="flex gap-2 mb-4 flex-wrap">
                                <button onClick={() => handleDeclarationTemplate('hours')} className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded border border-amber-500/50 hover:bg-amber-500 hover:text-black transition-colors">Horas</button>
                                <button onClick={() => handleDeclarationTemplate('service')} className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded border border-amber-500/50 hover:bg-amber-500 hover:text-black transition-colors">Prestação Serviços</button>
                                <button onClick={() => handleDeclarationTemplate('residence')} className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded border border-amber-500/50 hover:bg-amber-500 hover:text-black transition-colors">Residência</button>
                                <button onClick={() => handleDeclarationTemplate('vinculo')} className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded border border-amber-500/50 hover:bg-amber-500 hover:text-black transition-colors">Sem Vínculo</button>
                            </div>
                        )}
                        <Input label="Título / Assunto" value={data.letterSubject} onChange={e => handleChange('letterSubject', e.target.value)} />
                        <TextArea label="Conteúdo" value={data.letterBody} onChange={e => handleChange('letterBody', e.target.value)} className="min-h-[300px]" />
                    </div>
                )}

                {/* CARTA DE APRESENTAÇÃO (Novo) */}
                {data.type === 'coverLetter' && (
                    <div className="space-y-4">
                        <div className="mb-4">
                           <button onClick={handleCoverLetterTemplate} className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded border border-purple-500/50 hover:bg-purple-500 hover:text-black transition-colors">Preencher Modelo Padrão</button>
                        </div>
                        <Input label="Título / Assunto" value={data.letterSubject} onChange={e => handleChange('letterSubject', e.target.value)} />
                        <TextArea label="Corpo da Carta" value={data.letterBody} onChange={e => handleChange('letterBody', e.target.value)} className="min-h-[200px]" />
                        <div className="p-4 bg-purple-900/10 border border-purple-500/30 rounded-lg space-y-4">
                            <TextArea label="Objetivo Principal (Destaque)" value={data.coverLetterObjective} onChange={e => handleChange('coverLetterObjective', e.target.value)} className="min-h-[80px]" />
                            <Input label="Chamada para Ação (CTA)" value={data.coverLetterCta} onChange={e => handleChange('coverLetterCta', e.target.value)} placeholder="Ex: Gostaria de agendar uma reunião..." />
                        </div>
                    </div>
                )}
             </div>
        )}
      </div>

      {/* 3. FINANCEIRO & PRAZOS (Contrato/Orçamento/Recibo) */}
      {(data.type === 'contract' || data.type === 'quote' || data.type === 'invoice') && (
        <div className="space-y-2">
            <SectionHeader id="financial" title="Financeiro & Datas" icon={Wallet} />
            {activeSection === 'financial' && (
                <div className="p-5 bg-slate-900/30 border-l-2 border-amber-500 rounded-r-xl grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    {data.type === 'contract' && (
                        <>
                            <Input label="Valor Total (R$)" value={data.valueTotal} onChange={(e) => handleChange('valueTotal', e.target.value)} />
                            <Input label="Valor Entrada (R$)" value={data.valueEntry} onChange={(e) => handleChange('valueEntry', e.target.value)} />
                            <Input label="Valor Saldo (R$)" value={data.valueBalance} onChange={(e) => handleChange('valueBalance', e.target.value)} />
                            <Input label="Data do Saldo" value={data.balanceDate} onChange={(e) => handleChange('balanceDate', e.target.value)} />
                            <Input label="Prazo de Entrega (dias)" value={data.deliveryDays} onChange={(e) => handleChange('deliveryDays', e.target.value)} />
                            <Input label="Qtd. Revisões" value={data.revisionCount} onChange={(e) => handleChange('revisionCount', e.target.value)} />
                        </>
                    )}
                    {data.type === 'quote' && (
                         <div className="md:col-span-2">
                             <Input label="Validade da Proposta" value={data.quoteValidUntil} onChange={e => handleChange('quoteValidUntil', e.target.value)} />
                         </div>
                    )}
                    {data.type === 'invoice' && (
                        <>
                             <Input label="Número do Recibo/Nota" value={data.invoiceId} onChange={e => handleChange('invoiceId', e.target.value)} />
                             <Input label="Data de Emissão" value={data.invoiceIssueDate} onChange={e => handleChange('invoiceIssueDate', e.target.value)} />
                        </>
                    )}
                    {data.type !== 'invoice' && <Input label="Data do Documento" value={data.contractDate} onChange={e => handleChange('contractDate', e.target.value)} className="md:col-span-2" />}
                </div>
            )}
        </div>
      )}

      {/* 4. JURÍDICO & IA (Contrato/Orçamento/NDA) */}
      {(data.type === 'contract' || data.type === 'quote' || data.type === 'nda') && (
         <div className="space-y-2">
            <SectionHeader id="legal" title="Cláusulas & IA Jurídica" icon={Scale} />
            {activeSection === 'legal' && (
                <div className="p-5 bg-slate-900/30 border-l-2 border-rose-500 rounded-r-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Input label="Foro (Cidade-UF)" value={data.forumCity} onChange={e => handleChange('forumCity', e.target.value)} />
                    
                    <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/20">
                         <div className="flex items-center gap-2 mb-3 text-rose-400">
                             <Bot size={18} /> <span className="text-sm font-bold uppercase">Gerador de Cláusulas</span>
                         </div>
                         <div className="flex gap-2 mb-3">
                            <input className="flex-1 bg-slate-900 border border-slate-700 rounded px-4 py-2 text-sm" placeholder="Ex: Multa por atraso de pagamento de 10%..." value={clausePrompt} onChange={e => setClausePrompt(e.target.value)} />
                            <button onClick={handleGenerateClause} disabled={isClauseLoading} className="bg-rose-500 hover:bg-rose-600 px-4 rounded text-white font-bold text-xs uppercase tracking-wide transition-colors">
                                {isClauseLoading ? '...' : 'Gerar'}
                            </button>
                         </div>
                    </div>
                    
                    <TextArea label="Cláusulas Adicionais / Observações" value={data.extraClauses} onChange={e => handleChange('extraClauses', e.target.value)} className="min-h-[150px] font-mono text-sm" />
                </div>
            )}
         </div>
      )}

      {/* 5. ASSINATURA */}
      <div className="space-y-2">
         <SectionHeader id="signature" title="Assinatura Digital" icon={PenTool} />
         {activeSection === 'signature' && (
             <div className="p-5 bg-slate-900/30 border-l-2 border-sky-500 rounded-r-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                 <p className="text-xs text-slate-400 mb-2">Faça upload de uma imagem da sua assinatura (PNG transparente recomendado).</p>
                 <div className="flex items-center gap-4">
                     <button onClick={() => signatureInputRef.current?.click()} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm border border-slate-600 transition-colors">
                         Carregar Assinatura
                     </button>
                     <input type="file" ref={signatureInputRef} onChange={(e) => handleImageUpload(e, 'contractorSignature')} className="hidden" accept="image/*" />
                     {data.contractorSignature && (
                         <button onClick={() => handleChange('contractorSignature', null)} className="text-red-400 text-sm hover:underline">Remover</button>
                     )}
                 </div>
                 {data.contractorSignature && (
                     <div className="mt-4 p-4 bg-white rounded-lg inline-block">
                         <img src={data.contractorSignature} alt="Signature Preview" className="h-16 object-contain" />
                     </div>
                 )}
             </div>
         )}
      </div>

    </div>
  );
};
