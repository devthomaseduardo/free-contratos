import React, { useState } from 'react';
import { ContractData } from '../types';
import { Printer, Copy, CheckCircle2, Download, Loader2 } from 'lucide-react';

interface ContractPreviewProps {
  data: ContractData;
}

declare global {
  interface Window {
    html2pdf: any;
  }
}

export const ContractPreview: React.FC<ContractPreviewProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatCurrency = (val: number | string) => {
      if (typeof val === 'number') return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      return val.includes('R$') ? val : `R$ ${val}`;
  };

  const handlePrint = () => window.print();

  const handleCopy = () => {
    const text = document.getElementById('printable-content')?.innerText || '';
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-content');
    if (!element || !window.html2pdf) {
      alert('Biblioteca de PDF não carregada. Recarregue a página.');
      return;
    }

    setIsDownloading(true);

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-10000px';
    container.style.top = '0';
    container.style.width = '210mm';
    container.style.backgroundColor = '#ffffff';
    container.style.zIndex = '-9999';

    const clone = element.cloneNode(true) as HTMLElement;
    
    // PDF Specific Resets
    clone.style.width = '100%';
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.boxShadow = 'none';
    clone.style.height = 'auto';
    clone.style.transform = 'none';
    
    // Configura tipografia baseada no tipo para PDF
    if (data.type === 'contract' || data.type === 'letter' || data.type === 'declaration' || data.type === 'nda' || data.type === 'coverLetter') {
        clone.style.fontFamily = '"Times New Roman", Times, serif';
        clone.style.fontSize = '12pt';
        clone.style.textAlign = 'justify';
    } else {
        clone.style.fontFamily = '"Inter", sans-serif';
        clone.style.fontSize = '11pt';
    }

    // Force images
    const images = clone.querySelectorAll('img');
    images.forEach(img => {
        if (img.alt === 'Signature' && data.contractorSignature) img.src = data.contractorSignature;
        if (img.alt === 'Logo' && data.contractorLogo) img.src = data.contractorLogo;
    });

    container.appendChild(clone);
    document.body.appendChild(container);

    const opt = {
      margin: [15, 15, 15, 15], // mm
      filename: `${data.type}_${data.clientName || 'document'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        await window.html2pdf().set(opt).from(clone).save();
    } catch (err) {
        console.error(err);
        alert('Erro ao gerar PDF.');
    } finally {
        document.body.removeChild(container);
        setIsDownloading(false);
    }
  };

  // --- SUB-COMPONENTES DE RENDERIZAÇÃO ---

  const SignatureBlock = () => (
      <div className="mt-16 pt-8 border-t border-black flex justify-between gap-8 break-inside-avoid">
            <div className="flex-1 text-center flex flex-col items-center">
                <div className="h-16 w-full flex items-end justify-center mb-2">
                    {data.contractorSignature ? (
                        <img src={data.contractorSignature} alt="Signature" className="h-16 object-contain" />
                    ) : (
                        <div className="text-xs text-gray-300 italic mb-2">Assinado digitalmente</div>
                    )}
                </div>
                <p className="font-bold uppercase text-sm border-t border-black w-full pt-2">{data.contractorName}</p>
                <p className="text-xs text-gray-600">{data.contractorDoc}</p>
                <p className="text-[10px] uppercase tracking-wide mt-1 text-gray-500">CONTRATADO</p>
            </div>
            <div className="flex-1 text-center flex flex-col items-center justify-end">
                <div className="h-16 w-full mb-2"></div>
                <p className="font-bold uppercase text-sm border-t border-black w-full pt-2">{data.clientName || 'Cliente'}</p>
                <p className="text-xs text-gray-600">{data.clientDoc}</p>
                <p className="text-[10px] uppercase tracking-wide mt-1 text-gray-500">CONTRATANTE</p>
            </div>
        </div>
  );

  const Header = ({ simple = false }) => (
      <div className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between items-start break-inside-avoid">
          <div className="flex items-center gap-6">
              {data.contractorLogo && <img src={data.contractorLogo} alt="Logo" className="h-20 w-auto object-contain" />}
              <div>
                  <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-900">{data.contractorName}</h1>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mt-1">{data.contractorRole}</p>
              </div>
          </div>
          {!simple && (
              <div className="text-right text-xs text-gray-500 leading-relaxed">
                  <p>{data.contractorLocation}</p>
                  <p>{data.contractorContact}</p>
                  <p>{data.contractorDoc}</p>
              </div>
          )}
      </div>
  );

  // --- TEMPLATES ---

  const renderContract = () => (
    <>
        <Header />
        <div className="text-center mb-10 break-inside-avoid relative">
            <h2 className="font-serif font-bold text-xl uppercase tracking-widest text-gray-900">
                {data.type === 'nda' ? 'Acordo de Confidencialidade (NDA)' : 'Contrato de Prestação de Serviços'}
            </h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto mt-2"></div>
        </div>
        
        {data.type === 'nda' ? (
            <div className="mb-8 text-justify font-serif leading-relaxed text-gray-800 break-inside-avoid text-[11pt]">
                {/* NDA Intro */}
                <p className="mb-4">
                    Pelo presente instrumento particular, de um lado <strong>{data.contractorName}</strong>, inscrito no CNPJ {data.contractorDoc}, doravante denominado <strong>CONTRATADO</strong>.
                </p>
                <p className="mb-4">
                    E de outro lado <strong>{data.clientName}</strong>, inscrito no CPF/CNPJ {data.clientDoc}, doravante denominado <strong>CONTRATANTE</strong>.
                </p>
                 <div className="space-y-8 mt-6">
                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-xs tracking-widest mb-3 border-l-4 border-gray-900 pl-3">1. Do Objeto e Confidencialidade</h3>
                        <p>O presente acordo tem por objeto proteger as Informações Confidenciais disponibilizadas pelo CONTRATANTE ao CONTRATADO em razão de tratativas comerciais ou desenvolvimento de projetos.</p>
                    </div>
                    <div className="break-inside-avoid">
                         <h3 className="font-bold uppercase text-xs tracking-widest mb-3 border-l-4 border-gray-900 pl-3">2. Das Obrigações</h3>
                         <p>O CONTRATADO compromete-se a não utilizar, reproduzir ou divulgar quaisquer informações técnicas, financeiras ou comerciais a que tiver acesso, sob pena de responder por perdas e danos.</p>
                    </div>
                     <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-xs tracking-widest mb-3 border-l-4 border-gray-900 pl-3">3. Do Foro</h3>
                        <p>Fica eleito o foro da Comarca de <strong>{data.forumCity.split('-')[0].trim()}</strong> para dirimir quaisquer dúvidas oriundas deste contrato.</p>
                    </div>
                 </div>
            </div>
        ) : (
            <>
                <div className="mb-8 text-justify font-serif leading-relaxed text-gray-800 break-inside-avoid text-[11pt]">
                    <p className="mb-2"><strong>CONTRATANTE:</strong> {data.clientName || '[Nome do Cliente]'}, inscrito no CPF/CNPJ nº {data.clientDoc || '[Documento]'}, com endereço em {data.clientAddress || '[Endereço]'}, contato {data.clientZipPhone || '[Telefone]'}.</p>
                    <p className="mb-2"><strong>CONTRATADO:</strong> {data.contractorName}, CNPJ {data.contractorDoc}, residente em {data.contractorLocation}, {data.contractorRole}.</p>
                </div>

                <div className="space-y-6 font-serif text-gray-800 text-[11pt] leading-relaxed">
                    
                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">1. OBJETO DO CONTRATO</h3>
                        <p>O presente contrato tem por objeto a prestação de serviços digitais, incluindo mas não limitado a:</p>
                        <ul className="list-disc pl-8 mt-1 space-y-1">
                            {data.services.length > 0 ? data.services.map((s, i) => <li key={i}>{s}</li>) : <li>[Lista de Serviços]</li>}
                        </ul>
                    </div>
                    
                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">2. VALOR E PAGAMENTO</h3>
                        <p>O valor total do projeto é de <strong>{formatCurrency(data.valueTotal)}</strong>.</p>
                        <p className="mt-1">
                           Sendo 50% deste valor (<strong>{formatCurrency(data.valueEntry)}</strong>) pago como sinal para início dos trabalhos e os 50% restantes (<strong>{formatCurrency(data.valueBalance)}</strong>) pagos na entrega final ou na data de <strong>{data.balanceDate}</strong>.
                        </p>
                        <p className="mt-1 italic text-sm text-gray-600">O projeto só começa mediante pagamento de sinal. Caso haja parcelamento, condições deverão ser acordadas por escrito.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">3. REUNIÃO DE ALINHAMENTO</h3>
                        <p>Será realizada reunião para definição de escopo, identidade visual, prazos, entregas e demais detalhes técnicos após a assinatura e pagamento do sinal. Alterações após essa reunião podem ocasionar revisão de prazos e custos.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">4. PRAZO</h3>
                        <p>O prazo estabelecido é de <strong>{data.deliveryDays} dias úteis</strong>, contados a partir do pagamento do sinal e envio de todos os materiais necessários pelo contratante.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">5. AJUSTES E REVISÕES</h3>
                        <p>O contrato contempla até <strong>{data.revisionCount} rodadas de ajustes</strong> após a entrega da primeira versão do projeto. Solicitações extras ou mudanças de escopo serão cobertas como serviços adicionais.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">6. DIREITOS AUTORAIS</h3>
                        <p>O contratante terá direito de uso integral do produto final. O código-fonte e a documentação técnica permanecem propriedade intelectual do contratado, podendo ser utilizados para portfólio e fins didáticos, preservando-se dados sensíveis.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">7. CONFIDENCIALIDADE</h3>
                        <p>Ambas as partes comprometem-se a manter sigilo absoluto sobre informações técnicas, dados de clientes e materiais estratégicos obtidos durante o desenvolvimento do projeto.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">8. CANCELAMENTO</h3>
                        <p>Se o contratante cancelar após o pagamento do sinal, este não será reembolsado, servindo para cobrir horas de reserva e setup. Caso o contratado cancele sem justa causa, deverá devolver integralmente os valores já recebidos.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">9. ENTREGA E SUPORTE</h3>
                        <p>A entrega final e publicação ocorrerão somente após a quitação total do valor acordado e aprovação final. Suporte contínuo, manutenção ou atualizações futuras deverão ser contratados separadamente.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">10. RESPONSABILIDADES</h3>
                        <p><strong>Do Contratado:</strong> Cumprir escopos e prazos, entregar produto funcional e garantir boas práticas de desenvolvimento.</p>
                        <p><strong>Do Contratante:</strong> Entregar materiais (textos/imagens) no prazo, aprovar etapas rapidamente e cumprir os pagamentos.</p>
                    </div>

                    <div className="break-inside-avoid">
                        <h3 className="font-bold uppercase text-sm mb-2 text-black">11. FORO</h3>
                        <p>Fica eleito o foro da Comarca de <strong>{data.forumCity.split('-')[0].trim()}</strong> para dirimir quaisquer dúvidas ou assuntos relativos a este contrato.</p>
                    </div>

                     {data.extraClauses && (
                        <div className="break-inside-avoid mt-4 border-t border-gray-300 pt-4">
                            <h3 className="font-bold uppercase text-sm mb-2 text-black">OBSERVAÇÕES ADICIONAIS</h3>
                            <p className="whitespace-pre-wrap">{data.extraClauses}</p>
                        </div>
                    )}
                </div>
            </>
        )}

        <div className="mt-12 text-center text-sm font-serif italic text-gray-500 break-inside-avoid">
            {data.contractorLocation.split('-')[0].trim()}, {data.contractDate}.
        </div>

        <SignatureBlock />
    </>
  );

  const renderQuoteOrInvoice = () => {
    const isInvoice = data.type === 'invoice';
    const total = data.quoteItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    return (
        <div className="font-sans">
            <div className="flex justify-between items-start mb-12">
                <div className="flex items-start gap-4">
                    {data.contractorLogo && <img src={data.contractorLogo} alt="Logo" className="h-16 w-auto object-contain mt-1" />}
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">{isInvoice ? 'Nota Fiscal / Recibo' : 'Orçamento'}</h1>
                        <p className="text-gray-500 font-medium mt-1">Ref: {isInvoice ? `#${data.invoiceId}` : `${data.type.toUpperCase()}-001`}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="font-bold text-gray-900 text-lg">{data.contractorName}</h2>
                    <p className="text-sm text-gray-500">{data.contractorDoc}</p>
                    <p className="text-sm text-gray-500">{data.contractorContact}</p>
                </div>
            </div>

            <div className="flex justify-between bg-gray-50 rounded-lg p-6 mb-10 border border-gray-100 break-inside-avoid">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cliente / Tomador</p>
                    <p className="font-bold text-lg text-gray-900">{data.clientName}</p>
                    <p className="text-sm text-gray-600">{data.clientAddress}</p>
                    <p className="text-sm text-gray-600">{data.clientDoc}</p>
                </div>
                <div className="text-right">
                    <div className="mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Emissão</p>
                        <p className="font-medium text-gray-900">{isInvoice ? data.invoiceIssueDate : data.contractDate}</p>
                    </div>
                    <div>
                         {isInvoice && data.status === 'paid' ? (
                            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded font-bold text-xs uppercase inline-block">Pago</div>
                         ) : isInvoice ? (
                            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded font-bold text-xs uppercase inline-block">Em Aberto</div>
                         ) : (
                             <>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Válido Até</p>
                                <p className="font-medium text-emerald-600">{data.quoteValidUntil}</p>
                             </>
                         )}
                    </div>
                </div>
            </div>

            <table className="w-full mb-8 border-collapse">
                <thead className="bg-gray-900 text-white rounded-t-lg">
                    <tr>
                        <th className="text-left py-3 px-4 font-bold uppercase text-xs tracking-wider rounded-tl-lg">Descrição</th>
                        <th className="text-center py-3 px-4 font-bold uppercase text-xs tracking-wider w-24">Qtd</th>
                        <th className="text-right py-3 px-4 font-bold uppercase text-xs tracking-wider w-32">Unitário</th>
                        <th className="text-right py-3 px-4 font-bold uppercase text-xs tracking-wider w-32 rounded-tr-lg">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.quoteItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 text-sm font-medium text-gray-800">{item.description}</td>
                            <td className="text-center py-4 px-4 text-sm text-gray-600">{item.quantity}</td>
                            <td className="text-right py-4 px-4 text-sm text-gray-600">{formatCurrency(item.unitPrice)}</td>
                            <td className="text-right py-4 px-4 text-sm font-bold text-gray-900">{formatCurrency(item.quantity * item.unitPrice)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className="text-right py-6 px-4 font-bold text-xl uppercase tracking-tight text-gray-900">Total</td>
                        <td className="text-right py-6 px-4 font-extrabold text-xl text-emerald-600">{formatCurrency(total)}</td>
                    </tr>
                </tfoot>
            </table>

            {isInvoice && (
                <div className="mb-8 p-4 bg-slate-50 border border-dashed border-slate-300 rounded text-xs text-slate-500 text-justify">
                    <strong>Nota:</strong> Este documento comprova a prestação de serviços por profissional autônomo. Para fins contábeis e fiscais, verifique a legislação local sobre retenção de impostos (ISS/IRRF).
                </div>
            )}

            {data.extraClauses && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-3">Observações</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{data.extraClauses}</p>
                </div>
            )}
            
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                 <p className="text-sm font-medium text-gray-900 mb-4">{isInvoice ? 'Prestador:' : 'Aprovado por:'}</p>
                 <div className="w-64 h-12 border-b border-gray-300 mx-auto mb-2">
                      {isInvoice && data.contractorSignature && <img src={data.contractorSignature} className="h-12 mx-auto object-contain" />}
                 </div>
                 <p className="text-xs text-gray-500 uppercase">{isInvoice ? data.contractorName : 'Assinatura do Cliente'}</p>
            </div>
        </div>
    );
  };

  const renderCV = () => (
      <div className="font-sans text-gray-900 bg-white">
          {/* Header - ATS Clean Layout (Single Column) */}
          <div className="mb-6 border-b-2 border-gray-800 pb-4">
             <div className="flex justify-between items-start">
                <div>
                   <h1 className="text-3xl font-bold uppercase tracking-wide mb-1 text-black">{data.contractorName}</h1>
                   <p className="text-lg font-medium text-gray-700 mb-2">{data.contractorRole}</p>
                </div>
                {data.contractorLogo && <img src={data.contractorLogo} className="h-16 w-16 object-contain" />}
             </div>
             
             <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <span>{data.contractorLocation}</span>
                  <span className="text-gray-400">•</span>
                  <span>{data.contractorContact}</span>
             </div>
          </div>

          <div className="space-y-6">
              <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-300 mb-3 pb-1">Resumo Profissional</h3>
                  <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line text-justify">
                      {data.cvSummary}
                  </p>
              </section>

              <section>
                   <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-300 mb-3 pb-1">Habilidades Técnicas</h3>
                   <div className="text-sm leading-relaxed text-gray-800">
                      {/* ATS Friendly: Comma or Bullet separated text instead of Chips */}
                      <p>{data.cvSkills.join(' • ')}</p>
                   </div>
              </section>
              
              <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-300 mb-3 pb-1">Experiência Profissional</h3>
                  <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
                      {data.cvExperience}
                  </div>
              </section>
              
              <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-300 mb-3 pb-1">Formação Acadêmica</h3>
                  <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
                      {data.cvEducation}
                  </div>
              </section>
          </div>
      </div>
  );

  const renderCoverLetter = () => (
      <>
        <Header />
        <div className="mt-12 text-justify font-serif text-[11pt] leading-loose text-gray-900">
            <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
                 <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Para:</p>
                    <p className="font-bold text-lg">{data.clientName || 'Ao Gestor de Contratação'}</p>
                 </div>
                 <p className="text-sm text-gray-500">{data.contractorLocation.split('-')[0].trim()}, {data.contractDate}.</p>
            </div>
            
            <p className="mb-8 font-bold text-xl uppercase tracking-widest text-center">{data.letterSubject}</p>

            <div className="whitespace-pre-wrap mb-8">
                {data.letterBody}
            </div>

            {data.coverLetterObjective && (
                <div className="my-8 p-6 bg-gray-50 border-l-4 border-gray-900 break-inside-avoid">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Objetivo Principal</p>
                     <p className="text-lg font-medium italic text-gray-800">"{data.coverLetterObjective}"</p>
                </div>
            )}

            {data.coverLetterCta && (
                <div className="mt-8 mb-12 font-bold text-center text-gray-900 break-inside-avoid">
                    <p>{data.coverLetterCta}</p>
                </div>
            )}

            <div className="mt-12">
                <p className="mb-4">Atenciosamente,</p>
                {data.contractorSignature && <img src={data.contractorSignature} alt="Signature" className="h-16 mb-2 object-contain -ml-2" />}
                <div className="font-bold uppercase tracking-wide">{data.contractorName}</div>
                <div className="text-sm text-gray-600">{data.contractorRole}</div>
                <div className="text-xs text-gray-500 mt-1">{data.contractorContact}</div>
            </div>
        </div>
      </>
  );

  const renderLetterOrDeclaration = () => (
      <>
        <Header />
        <div className="mt-16 text-justify font-serif text-[11pt] leading-loose text-gray-900">
            <p className="text-right mb-16">{data.contractorLocation.split('-')[0].trim()}, {data.contractDate}.</p>
            
            <p className="mb-8 font-bold text-xl uppercase tracking-widest text-center">{data.letterSubject}</p>

            <div className="whitespace-pre-wrap min-h-[300px]">
                {data.letterBody}
            </div>

            <div className="mt-24">
                <p className="mb-4">Atenciosamente,</p>
                {data.contractorSignature && <img src={data.contractorSignature} alt="Signature" className="h-16 mb-2 object-contain -ml-2" />}
                <div className="font-bold uppercase tracking-wide">{data.contractorName}</div>
                <div className="text-sm text-gray-600">{data.contractorRole}</div>
            </div>
        </div>
      </>
  );

  return (
    <div className="flex flex-col h-full bg-[#111827]">
        <div className="flex justify-between items-center px-6 py-4 bg-[#0B0F19] border-b border-slate-800 shrink-0 shadow-lg z-20">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${data.status === 'final' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : data.status === 'pending' ? 'bg-amber-500' : 'bg-slate-500'}`} />
                <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">
                    {data.type} &middot; {data.status}
                </span>
            </div>
            
            <div className="flex gap-3">
                <button type="button" onClick={handleCopy} className="group relative flex items-center justify-center p-2 text-slate-400 hover:text-white transition-colors">
                    {copied ? <CheckCircle2 size={18} className="text-emerald-500"/> : <Copy size={18}/>}
                    <span className="absolute bottom-full mb-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Copiar Texto</span>
                </button>
                <div className="h-6 w-px bg-slate-800 mx-1"></div>
                <button type="button" onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all hover:shadow-lg">
                    <Printer size={16}/> IMPRIMIR
                </button>
                <button type="button" onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {isDownloading ? 'GERANDO...' : 'BAIXAR PDF'}
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-[#111827] scroll-smooth flex justify-center items-start relative perspective-1000">
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]"></div>
            </div>

            <div 
                id="printable-content" 
                className="bg-white text-black relative transition-transform duration-500 origin-top"
                style={{
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '2.5cm',
                    boxSizing: 'border-box',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Watermark for Draft */}
                {data.status === 'draft' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                        <p className="text-gray-100 text-[120px] font-bold uppercase -rotate-45 select-none opacity-50">RASCUNHO</p>
                    </div>
                )}
                
                {/* Content Layer */}
                <div className="relative z-10">
                    {(data.type === 'contract' || data.type === 'nda') && renderContract()}
                    {(data.type === 'quote' || data.type === 'invoice') && renderQuoteOrInvoice()}
                    {data.type === 'cv' && renderCV()}
                    {(data.type === 'letter' || data.type === 'declaration') && renderLetterOrDeclaration()}
                    {data.type === 'coverLetter' && renderCoverLetter()}
                </div>
            </div>
        </div>
    </div>
  );
};
