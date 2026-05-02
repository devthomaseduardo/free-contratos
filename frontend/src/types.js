export const INITIAL_CONTRACT_DATA = {
  type: 'contract',
  status: 'draft',
  accentColor: '#6366f1',
  risks: [],
  letterheadStyle: 'classic',
  pixKey: '',
  typographyStyle: 'modern',
  language: 'pt',
  clientProfiles: [],


  contractorName: "Seu Nome Completo",
  contractorDoc: "00.000.000/0001-00",
  contractorLocation: "Sua Cidade - UF",
  contractorRole: "Seu Cargo / Profissão",
  contractorEmail: "seuemail@exemplo.com",
  contractorPhone: "(00) 00000-0000",
  contractorLinkedin: "linkedin.com/in/seuperfil",
  contractorGithub: "github.com/seuperfil",
  contractorPortfolio: "seuportfolio.com.br",
  contractorSignature: null,
  contractorLogo: null,

  timeline: [], 
  taxConfig: { iss: 5, irrf: 0, platformFee: 0 },

  
  cvSummary: "Desenvolvedor(a) de Software Júnior - Full Stack com sólida vivência no ecossistema Java e desenvolvimento Web. Focado(a) na implementação, deploy e manutenção de soluções backend e frontend integradas. Possuo postura proativa na investigação de logs em servidores Linux, forte capacidade analítica em ambientes de produção e interesse direto por inovações tecnológicas envolvendo integração de hardware (RFID e dispositivos físicos).",
  cvExperience: "• Analista Desenvolvedor Júnior | TechSolutions (2022 - Atual)\n- Desenvolvimento e manutenção evolutiva em aplicações Java (Backend e APIs REST).\n- Criação de interfaces responsivas utilizando JSF, HTML, CSS e JavaScript.\n- Integração contínua e versionamento via Git, com deploys recorrentes em ambiente Linux.\n- Monitoramento de aplicações em produção: análise de logs, investigação de comportamentos anômalos e correção rápida de bugs críticos.\n- Forte atuação com banco de dados relacionais (SQL).\n\n• Estagiário em Desenvolvimento | InovaWeb (2021 - 2022)\n- Apoio à equipe sênior na estruturação de aplicações backend.\n- Contato prático com integrações de hardwares e leitura de especificações técnicas de IoT/RFID.\n- Criação e manutenção de componentes em aplicativos Android (Java).",
  cvEducation: "• Bacharelado em Ciência da Computação\nUniversidade de São Paulo (USP) | 2018 - 2022",
  cvSkills: ["Java", "JSF", "HTML / CSS / JavaScript", "APIs REST", "Linux (Linha de Comando & Logs)", "SQL / Bancos Relacionais", "Android (Java)", "EJB / WildFly / GlassFish", "Integração RFID / Hardware", "Git", "Análise de Sistemas em Produção"],
  
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

  cvSummary: "Resumo profissional. Descreva aqui suas principais habilidades, anos de experiência, conquistas mais importantes e o que você busca na sua carreira.",
  
  cvExperience: "EXPERIÊNCIA PROFISSIONAL\n\nEmpresa Exemplo (Mês/Ano – Presente)\nCargo / Função\nDescreva suas principais atividades e resultados alcançados nesta posição.\n\nEmpresa Anterior (Mês/Ano – Mês/Ano)\nCargo / Função\nDescreva suas principais atividades e resultados alcançados nesta posição.",
  
  cvEducation: "Formação Acadêmica – Instituição (Ano de Conclusão)\n\nCertificações:\n- Certificação Exemplo 1\n- Certificação Exemplo 2",
  
  cvProjects: "PROJETOS EM DESTAQUE\n\nNome do Projeto 1 (Link) - Tecnologias Usadas\nBreve descrição do problema resolvido e do impacto gerado pelo projeto.\n\nNome do Projeto 2 (Link) - Tecnologias Usadas\nBreve descrição do problema resolvido e do impacto gerado pelo projeto.",
  
  cvSkills: [
    "Habilidade 1", "Habilidade 2", "Habilidade 3", "Habilidade 4", "Habilidade 5"
  ],

  letterBody: "Prezados,\n\nEscrevo para apresentar minha proposta de serviços...",
  letterSubject: "Apresentação Comercial",
  
  coverLetterObjective: "Demonstrar como minha experiência técnica pode resolver os gargalos de performance da sua plataforma atual.",
  coverLetterCta: "Gostaria de agendar uma breve reunião de 15 minutos para apresentar alguns cases de sucesso.",
};
