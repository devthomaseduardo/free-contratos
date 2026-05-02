export const INITIAL_CONTRACT_DATA = {
  type: 'cv',
  status: 'draft',
  accentColor: '#3b82f6',
  risks: [],
  letterheadStyle: 'classic',
  pixKey: '',
  typographyStyle: 'modern',
  language: 'pt',
  clientProfiles: [],

  showHeader: true,
  showFooter: true,
  showWatermark: true,
  showStamps: false,

  contractorName: "THOMAS NASCIMENTO",
  contractorDoc: "000.000.000-00",
  contractorLocation: "São Paulo – SP",
  contractorRole: "DESENVOLVEDOR DE SOFTWARE JÚNIOR - FULL STACK",
  contractorEmail: "devthomaseduardo",
  contractorPhone: "(11)97497-5062",
  contractorLinkedin: "linkedin.com/in/devthomaseduardo",
  contractorGithub: "github.com/devthomaseduardo",
  contractorPortfolio: "www.thomaseduardo.online",
  contractorSignature: null,
  contractorLogo: null,

  timeline: [], 
  taxConfig: { iss: 5, irrf: 0, platformFee: 0 },

  cvSummary: "Desenvolvedor Fullstack com experiência prática na criação de aplicações web utilizando React, Node.js e TypeScript, com foco em APIs, integrações e automação de processos. Tenho experiência no desenvolvimento de sistemas com integração de pagamentos, criação de APIs REST e deploy de aplicações. Atualmente, estou expandindo meus conhecimentos em backend com foco em Java, buscando compreender melhor arquitetura de sistemas, orientação a objetos e ambientes corporativos. Busco oportunidade como desenvolvedor júnior para atuar no ciclo completo de desenvolvimento, contribuindo com soluções práticas e evoluindo tecnicamente.",
  
  cvExperience: "• Desenvolvedor Full Stack (Freelancer) | 2023 - Atual\n- Desenvolvimento de aplicações web completas com React e Node.js\n- Criação de APIs REST para integração entre frontend e backend\n- Integração com serviços externos (Stripe, Mercado Pago, Webhooks)\n- Deploy de aplicações em ambientes de hospedagem (Vercel, cPanel, AWS)\n- Monitoramento básico de aplicações e correção de bugs\n\nResultados:\n- Automatização de processos de vendas\n- Aumento de conversão em projetos de landing page\n- Melhoria de performance e experiência do usuário",
  
  cvEducation: "• Engenharia de Software (em andamento) - Anhanguera\n\nCertificações:\n- AWS Desenvolvimento em Nuvem\n- Ada Tech Desenvolvimento Web",
  
  cvProjects: "• Sistema de Vendas com Integração de Pagamento\n- Backend com Node.js para processamento de pagamentos\n- Integração com Stripe e Mercado Pago\n- Uso de APIs REST e Webhooks\n\n• E-commerce (Reis do Manto)\n- Desenvolvimento completo (frontend + backend)\n- Cálculo dinâmico de preços e frete\n- Integração com pagamentos e automação via WhatsApp\n\n• Landing Pages com Foco em Conversão\n- Otimização de performance (Core Web Vitals)\n- Integração com APIs e captação de leads",
  
  cvSkills: [
    "React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", 
    "Node.js", "Express", "APIs REST", "PostgreSQL", "MongoDB", 
    "Git", "Webhooks", "Deploy", "Java (Learning)", "POO", "SQL"
  ],

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

  letterBody: "Prezados,\n\nEscrevo para apresentar minha proposta de serviços...",
  letterSubject: "Apresentação Comercial",
  
  coverLetterObjective: "Demonstrar como minha experiência técnica pode resolver os gargalos de performance da sua plataforma atual.",
  coverLetterCta: "Gostaria de agendar uma breve reunião de 15 minutos para apresentar alguns cases de sucesso.",
};
