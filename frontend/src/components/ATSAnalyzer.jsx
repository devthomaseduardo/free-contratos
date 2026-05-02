import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Zap, RefreshCcw, BrainCircuit } from 'lucide-react';
import { analyzeATSWithAI } from '../services/api';

export const ATSAnalyzer = ({ cvData, onClose }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [useAI, setUseAI] = useState(true);

  // Fallback Tech Dictionary if AI is off
  const techDictionary = [
    'java', 'javascript', 'python', 'c#', 'c++', 'php', 'ruby', 'go', 'typescript', 'swift', 'kotlin',
    'html', 'css', 'sql', 'nosql', 'mysql', 'postgresql', 'mongodb', 'oracle', 'redis',
    'react', 'angular', 'vue', 'node', 'node.js', 'spring', 'springboot', 'jsf', 'ejb', 'django', 'flask',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'cloud', 'linux', 'unix', 'windows',
    'git', 'github', 'gitlab', 'ci/cd', 'jenkins', 'rest', 'api', 'apis', 'graphql', 'soap',
    'microserviços', 'arquitetura', 'mvc', 'solid', 'clean', 'agile', 'scrum', 'kanban',
    'rfid', 'iot', 'hardware', 'redes', 'infraestrutura', 'servidores', 'deploy', 'logs',
    'qa', 'testes', 'tdd', 'bdd', 'jest', 'selenium', 'cypress', 'figma', 'ux', 'ui',
    'wildfly', 'glassfish', 'tomcat', 'apache', 'nginx', 'fullstack', 'backend', 'frontend', 'mobile', 'android', 'ios'
  ];

  const analyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    if (useAI) {
      try {
        const data = await analyzeATSWithAI(cvData, jobDescription);
        setResults({
          score: data.score,
          found: data.found,
          missing: data.missing,
          interview_tips: data.interview_tips
        });
      } catch (error) {
        console.error("AI Analysis failed, falling back to local:", error);
        runLocalAnalysis();
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      runLocalAnalysis();
    }
  };

  const runLocalAnalysis = () => {
      // CV Corpus
      const cvText = `
        ${cvData.contractorRole || ''}
        ${cvData.cvSummary || ''}
        ${cvData.cvExperience || ''}
        ${cvData.cvEducation || ''}
        ${(cvData.cvSkills || []).join(' ')}
      `.toLowerCase();

      const jobDescClean = jobDescription.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ');
      const jobWordsRaw = jobDescClean.split(/\s+/);
      const extractedJobSkills = new Set();
      
      jobWordsRaw.forEach(word => {
        if (techDictionary.includes(word)) extractedJobSkills.add(word);
      });
      
      const potentialKeywords = Array.from(extractedJobSkills);
      const found = [];
      const missing = [];

      potentialKeywords.forEach(skill => {
        let cvHasSkill = cvText.includes(skill);
        if (skill === 'sql' && cvText.includes('bancos relacionais')) cvHasSkill = true;
        if (skill === 'api' && cvText.includes('apis')) cvHasSkill = true;
        
        if (cvHasSkill) found.push(skill);
        else missing.push(skill);
      });

      const totalKeywords = found.length + missing.length;
      const score = totalKeywords === 0 ? 0 : Math.round((found.length / totalKeywords) * 100);

      setResults({ score, found, missing, interview_tips: null });
      setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 p-6 md:p-12 overflow-y-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-azure/10 flex items-center justify-center border border-azure/20">
              <Target className="text-azure" size={20} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Analisador ATS <span className="text-[10px] bg-azure/20 text-azure px-2 py-1 rounded ml-2 tracking-widest">AI POWERED</span></h2>
          </div>
          <p className="text-slate-400 text-sm">Usando a Plataforma de Agentes da Google Cloud (Vertex AI) para análise semântica.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
              onClick={() => setUseAI(!useAI)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                useAI ? 'bg-azure/10 border-azure/30 text-azure shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 text-slate-500'
              }`}
           >
              <BrainCircuit size={14} /> {useAI ? 'Motor IA Ativo' : 'Motor Local Ativo'}
           </button>
           <button 
              onClick={onClose}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Voltar ao Editor
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Left Col - Input */}
        <div className="flex flex-col h-full">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            Cole a Descrição da Vaga Aqui
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-sm text-slate-300 resize-none focus:outline-none focus:border-azure/50 transition-colors custom-scrollbar"
            placeholder="Ex: A Nexxto está ampliando seu time e busca um(a) Desenvolvedor(a) de Software Júnior - Full Stack..."
          />
          <button 
            onClick={analyze}
            disabled={isAnalyzing || !jobDescription.trim()}
            className={`mt-4 w-full py-4 ${useAI ? 'bg-gradient-to-r from-azure to-violet-600 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'bg-azure'} hover:opacity-90 disabled:opacity-50 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2`}
          >
            {isAnalyzing ? (
              <><RefreshCcw size={16} className="animate-spin" /> {useAI ? 'Consultando Agente Google...' : 'Analisando Padrões...'}</>
            ) : (
              <><Zap size={16} /> {useAI ? 'Rodar Análise Semântica (IA)' : 'Rodar Motor Local'}</>
            )}
          </button>
        </div>

        {/* Right Col - Results */}
        <div className="flex flex-col h-full bg-white/[0.02] rounded-2xl border border-white/5 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {!results ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-30">
              <Target size={48} className="mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest text-center">Aguardando inserção da vaga<br/>para cruzar os dados.</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Match Score Semântico</p>
                  <div className="flex items-end gap-2">
                    <span className={`text-5xl font-black tracking-tighter leading-none ${
                      results.score >= 75 ? 'text-emerald-500' : results.score >= 40 ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {results.score}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
                     results.score >= 75 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                     results.score >= 40 ? 'bg-amber-500/10 text-amber-500 border-amber-400/20' : 
                     'bg-rose-500/10 text-rose-500 border-rose-500/20'
                  }`}>
                    {results.score >= 75 ? 'Alta Aderência' : results.score >= 40 ? 'Média Aderência' : 'Baixa Aderência'}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Palavras-chave Encontradas
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.found.length > 0 ? results.found.map((w, i) => (
                    <span key={i} className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 capitalize">
                      {w}
                    </span>
                  )) : <span className="text-xs text-slate-500">Nenhuma palavra-chave principal encontrada.</span>}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <XCircle size={14} className="text-rose-500" /> Ausentes (Oportunidades de Inclusão)
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.missing.length > 0 ? results.missing.map((w, i) => (
                    <span key={i} className="text-xs bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded border border-rose-500/20 capitalize">
                      {w}
                    </span>
                  )) : <span className="text-xs text-slate-500">Currículo atende perfeitamente à vaga.</span>}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                {/* AI INTERVIEW DOSSIER (High Score Bonus) */}
                {results.score >= 60 && (
                  <div className="bg-azure/5 border border-azure/20 rounded-xl p-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={16} className="text-azure" />
                      <h4 className="text-sm font-black text-azure uppercase tracking-widest">Dossiê Tático de Entrevista {useAI ? '(Gerado por IA)' : ''}</h4>
                    </div>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      Prepare-se para estas perguntas baseadas nas exigências técnicas desta vaga:
                    </p>
                    <ul className="space-y-4">
                      {results.interview_tips ? results.interview_tips.map((tip, i) => (
                        <li key={i} className="text-xs text-slate-400 bg-black/20 p-4 rounded-lg border border-white/5">
                           {tip}
                        </li>
                      )) : (
                        <>
                          <li className="text-xs text-slate-400 bg-black/20 p-4 rounded-lg border border-white/5">
                            <strong className="text-slate-200 block mb-1">1. Autonomia & Troubleshooting:</strong>
                            "Me conte sobre uma vez que você teve que investigar um bug complexo em ambiente de produção (usando logs do Linux ou do servidor de aplicação). Como você isolou e corrigiu a falha?"
                          </li>
                          <li className="text-xs text-slate-400 bg-black/20 p-4 rounded-lg border border-white/5">
                            <strong className="text-slate-200 block mb-1">2. Arquitetura & Integração:</strong>
                            "Como você construiria a comunicação entre a nossa aplicação web/backend em Java e equipamentos de integração física?"
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
                <p className="text-[10px] text-slate-500 italic mt-6 leading-relaxed">
                  Nota: O Motor IA utiliza análise semântica para entender sinônimos. O Motor Local utiliza dicionário estático de competências.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
