
export type DocumentType = 'contract' | 'quote' | 'invoice' | 'cv' | 'letter' | 'declaration' | 'nda' | 'coverLetter';
export type DocumentStatus = 'draft' | 'pending' | 'final' | 'paid';

export interface DocumentItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ContractData {
  // Configuração
  type: DocumentType;
  status: DocumentStatus;
  
  // Identificação Padrão (Usado em todos)
  contractorName: string;
  contractorDoc: string; // CPF/CNPJ
  contractorLocation: string; // Cidade - Estado
  contractorRole: string; // Função
  contractorContact: string; // Email/Tel
  contractorSignature: string | null;
  contractorLogo: string | null; // Novo: Logomarca

  clientName: string;
  clientAddress: string;
  clientZipPhone: string;
  clientDoc: string; // CPF/CNPJ

  // Contrato & NDA
  services: string[]; 
  valueTotal: string;
  valueEntry: string;
  valueBalance: string;
  balanceDate: string;
  deliveryDays: string;
  revisionCount: string;
  extraClauses: string;
  forumCity: string;
  contractDate: string;

  // Orçamento (Quote) & Recibo (Invoice)
  quoteItems: DocumentItem[];
  quoteValidUntil: string;
  invoiceId: string; // Número do Recibo/Nota
  invoiceIssueDate: string;

  // CV
  cvSummary: string;
  cvExperience: string;
  cvEducation: string;
  cvSkills: string[];

  // Papel Timbrado & Declaração & Carta
  letterBody: string;
  letterSubject: string;

  // Carta de Apresentação (Novo)
  coverLetterObjective: string;
  coverLetterCta: string;
}

export const INITIAL_CONTRACT_DATA: ContractData = {
  type: 'contract',
  status: 'draft',

  contractorName: "Thomas Eduardo R. Nascimento",
  contractorDoc: "60.882.678/0001-77",
  contractorLocation: "São Paulo - SP",
  contractorRole: "Desenvolvedor Web Freelancer",
  contractorContact: "devthomaseduardo@gmail.com | (11) 97497-5062",
  contractorSignature: null,
  contractorLogo: null,
  
  clientName: "",
  clientAddress: "",
  clientZipPhone: "",
  clientDoc: "",
  
  services: [
    "Criação de Landing Pages e Sites Institucionais",
    "Desenvolvimento de E-commerces e Sistemas Web",
    "Otimização de SEO e Performance",
    "Manutenção e Suporte Técnico"
  ],
  
  valueTotal: "0,00",
  valueEntry: "0,00",
  valueBalance: "0,00",
  balanceDate: "na entrega final",
  
  deliveryDays: "15",
  revisionCount: "2",
  
  extraClauses: "",
  
  forumCity: "São Paulo - SP",
  contractDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),

  quoteItems: [],
  quoteValidUntil: "15 dias",
  invoiceId: new Date().getFullYear() + "-001",
  invoiceIssueDate: new Date().toLocaleDateString('pt-BR'),

  cvSummary: "Desenvolvedor Fullstack focado em performance e resultados de negócio. Especialista em React, Node.js e Arquitetura de Software Escalável.",
  cvExperience: "Senior Frontend Engineer | Tech Corp (2021 - Atual)\n- Liderança de squads ágeis\n- Redução de 40% no tempo de carregamento da aplicação\n\nFullstack Developer | Freelancer (2019 - 2021)\n- Entrega de +30 projetos de e-commerce e plataformas SaaS",
  cvEducation: "Bacharelado em Ciência da Computação\nUniversidade de São Paulo (USP) - 2016 a 2020",
  cvSkills: ["React / Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "AWS"],

  letterBody: "Prezados,\n\nEscrevo para apresentar minha proposta de serviços...",
  letterSubject: "Apresentação Comercial",
  
  coverLetterObjective: "Demonstrar como minha experiência técnica pode resolver os gargalos de performance da sua plataforma atual.",
  coverLetterCta: "Gostaria de agendar uma breve reunião de 15 minutos para apresentar alguns cases de sucesso.",
};
