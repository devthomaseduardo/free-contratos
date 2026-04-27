export const INITIAL_CONTRACT_DATA = {
  type: 'contract',
  status: 'draft',
  accentColor: '#6366f1',
  risks: [],
  letterheadStyle: 'classic',
  pixKey: '',
  clientProfiles: [],


  contractorName: "Thomas Nascimento",
  contractorDoc: "60.882.678/0001-77",
  contractorLocation: "São Paulo - SP",
  contractorRole: "Desenvolvedor Fullstack Sênior",
  contractorContact: "devthomaseduardo@gmail.com | (11) 97497-5062",
  contractorLinkedin: "linkedin.com/in/devthomaseduardo",
  contractorGithub: "github.com/devthomaseduardo",
  contractorPortfolio: "thomaseduardo.online",
  contractorSignature: null,
  contractorLogo: null,

  timeline: [], 
  taxConfig: { iss: 5, irrf: 0, platformFee: 0 },

  
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

  cvSummary: "Desenvolvedor Fullstack com uma abordagem pragmática e orientada a resultados, especializado em transformar desafios de negócio em soluções digitais robustas, escaláveis e que entregam valor mensurável em produção. Minha expertise vai além da codificação: foco na arquitetura de sistemas, em decisões técnicas estratégicas que garantem performance (Core Web Vitals), segurança e manutenibilidade, e na gestão completa do ciclo de vida do projeto, do planejamento ao deploy na AWS. Com proficiência em React, Next.js e Node.js, construo interfaces de usuário que convertem e backends que sustentam o crescimento, sempre com um olhar crítico para o impacto direto no ROI do cliente.",
  
  cvExperience: "EXPERIÊNCIA EM PROJETOS E CONSULTORIA (FREELANCE)\n\nAtuação como Desenvolvedor Fullstack Autônomo (08/2023 – Presente)\n\nHazap Informática – Otimização de Conversão e SEO\nDesafio: Baixa captação de leads e posicionamento orgânico ineficaz.\nSolução: Landing Page de alta performance com TypeScript e Astro (Core Web Vitals). Integração com API do WordPress.\nResultado: +40% na taxa de conversão de formulários e melhoria no ranqueamento orgânico.\n\nColor Waves (Instituto Kell) – Sistema de Checkout e Vendas\nDesafio: Processo de vendas manual e propenso a erros.\nSolução: Checkout completo com React, Node.js e integração Stripe (Pix/Cartão).\nResultado: Automação de 100% do fluxo de vendas e eliminação de erros manuais.\n\nReis do Manto – E-commerce de Nicho\nDesafio: Lançar e-commerce competitivo com experiência fluida.\nSolução: Loja virtual do zero (React/Node.js) com otimização de funil de vendas.\nResultado: UX/UI superior e processos de checkout simplificados, consolidando a marca.\n\nBras Service – Presença Digital e Captação de Clientes\nDesafio: Necessidade de presença digital moderna e CTAs estratégicos.\nSolução: Landing Page (React, TypeScript, Tailwind, Framer Motion, shadcn/ui).\nResultado: Aumento na visibilidade online e captação otimizada de leads via WhatsApp.",
  
  cvEducation: "Engenharia de Software – Anhanguera (Em andamento)\n\nCertificações:\n- AWS Certified Cloud Practitioner\n- Web Development (freeCodeCamp / Great Learning)\n- React JS (Great Learning)",
  
  cvSkills: [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Astro", "Node.js", "Express", "Prisma", "PostgreSQL", "MongoDB", "AWS (EC2, S3, Lambda)", "Docker", "Stripe API", "n8n", "Clean Code", "TDD"
  ],

  letterBody: "Prezados,\n\nEscrevo para apresentar minha proposta de serviços...",
  letterSubject: "Apresentação Comercial",
  
  coverLetterObjective: "Demonstrar como minha experiência técnica pode resolver os gargalos de performance da sua plataforma atual.",
  coverLetterCta: "Gostaria de agendar uma breve reunião de 15 minutos para apresentar alguns cases de sucesso.",
};
