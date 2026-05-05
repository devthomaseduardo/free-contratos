/** OpenAPI 3.0 — usado pelo Swagger UI em GET /api/v1/docs */
export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'devthomas/contratos API',
    description:
      'API REST do emissor devthomas/contratos (contratos, orçamentos, CV, etc.). IA (refino de escopo e cláusulas) no servidor com Google Gemini — chave só no backend.',
    version: '1.0.0',
    contact: { name: 'devthomas · freelance' },
  },
  servers: [
    { url: 'http://localhost:4000', description: 'Desenvolvimento' },
    { url: '/api/v1', description: 'Prefixo relativo (proxy)' },
  ],
  tags: [
    { name: 'Sistema', description: 'Saúde e metadados' },
    { name: 'IA', description: 'Integração Gemini (texto)' },
    { name: 'Clientes', description: 'Gestão de clientes' },
    { name: 'Documentos', description: 'Gestão de documentos' },
    { name: 'Pagamentos', description: 'Pagamentos PIX via Mercado Pago' },
  ],
  paths: {
    '/api/v1/health': {
      get: {
        tags: ['Sistema'],
        summary: 'Health check',
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'Serviço disponível',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthResponse' },
              },
            },
          },
        },
      },
    },
    '/api/v1/ai/refine-services': {
      post: {
        tags: ['IA'],
        summary: 'Refinar descrição de serviços',
        description:
          'Transforma texto bruto em lista de itens profissionais para contrato (JSON array de strings via modelo). Sem API key, devolve o texto como único item.',
        operationId: 'postRefineServices',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RefineServicesRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Lista refinada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RefineServicesResponse' },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/ServerError' },
        },
      },
    },
    '/api/v1/ai/generate-clause': {
      post: {
        tags: ['IA'],
        summary: 'Gerar cláusula contratual',
        description: 'Gera texto de cláusula em pt-BR a partir de um pedido em linguagem natural.',
        operationId: 'postGenerateClause',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/GenerateClauseRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Cláusula gerada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/GenerateClauseResponse' },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/ServerError' },
        },
      },
    },
    '/api/v1/ai/analyze-risks': {
      post: {
        tags: ['IA'],
        summary: 'Analisar riscos do documento',
        description: 'Analisa o conteúdo de um documento e identifica riscos, cláusulas faltantes ou pontos de atenção.',
        operationId: 'postAnalyzeRisks',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', description: 'Conteúdo do documento para análise' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Lista de riscos e dicas',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/RiskItem' } },
              },
            },
          },
          '500': { $ref: '#/components/responses/ServerError' },
        },
      },
    },
    '/api/v1/ai/generate-timeline': {
      post: {
        tags: ['IA'],
        summary: 'Gerar cronograma do projeto',
        description: 'Cria um cronograma técnico de execução baseado nos serviços listados.',
        operationId: 'postGenerateTimeline',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['services'],
                properties: {
                  services: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Cronograma gerado',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/TimelinePhase' } },
              },
            },
          },
          '500': { $ref: '#/components/responses/ServerError' },
        },
      },
    },
    '/api/v1/ai/analyze-ats': {
      post: {
        tags: ['IA'],
        summary: 'Análise ATS de currículo',
        description: 'Analisa a aderência entre um currículo e uma descrição de vaga usando IA.',
        operationId: 'postAnalyzeATS',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ATSRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Resultado da análise ATS',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ATSResponse' },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '500': { $ref: '#/components/responses/ServerError' },
        },
      },
    },
    '/api/v1/clients': {
      get: {
        tags: ['Clientes'],
        summary: 'Listar clientes',
        operationId: 'getClients',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Lista de clientes' },
          '401': { description: 'Não autenticado' },
        },
      },
      post: {
        tags: ['Clientes'],
        summary: 'Criar/atualizar cliente',
        operationId: 'saveClient',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: {
          '200': { description: 'Cliente salvo' },
          '401': { description: 'Não autenticado' },
        },
      },
    },
    '/api/v1/clients/{doc}': {
      delete: {
        tags: ['Clientes'],
        summary: 'Deletar cliente',
        operationId: 'deleteClient',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'doc', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '204': { description: 'Cliente removido' },
          '401': { description: 'Não autenticado' },
        },
      },
    },
    '/api/v1/documents': {
      get: {
        tags: ['Documentos'],
        summary: 'Listar documentos do usuário',
        operationId: 'getDocuments',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Lista de documentos' },
          '401': { description: 'Não autenticado' },
        },
      },
      post: {
        tags: ['Documentos'],
        summary: 'Salvar documento',
        operationId: 'saveDocument',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: {
          '200': { description: 'Documento salvo' },
          '401': { description: 'Não autenticado' },
        },
      },
    },
    '/api/v1/documents/{id}': {
      delete: {
        tags: ['Documentos'],
        summary: 'Deletar documento',
        operationId: 'deleteDocument',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '204': { description: 'Documento removido' },
          '401': { description: 'Não autenticado' },
        },
      },
    },
    '/api/v1/payments/pix': {
      post: {
        tags: ['Pagamentos'],
        summary: 'Gerar pagamento PIX',
        description: 'Cria um pagamento PIX via Mercado Pago.',
        operationId: 'postPixPayment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PixPaymentRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'QR Code PIX gerado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PixPaymentResponse' },
              },
            },
          },
          '500': { $ref: '#/components/responses/ServerError' },
        },
      },
    },
  },
  components: {
    responses: {
      BadRequest: {
        description: 'Validação falhou',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
      ServerError: {
        description: 'Erro interno',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
    },
    schemas: {
      HealthResponse: {
        type: 'object',
        required: ['status', 'version', 'timestamp'],
        properties: {
          status: { type: 'string', example: 'ok' },
          version: { type: 'string', example: '1.0.0' },
          timestamp: { type: 'string', format: 'date-time' },
          geminiConfigured: { type: 'boolean' },
        },
      },
      RefineServicesRequest: {
        type: 'object',
        required: ['rawInput'],
        properties: {
          rawInput: { type: 'string', minLength: 1, maxLength: 8000 },
        },
      },
      RefineServicesResponse: {
        type: 'object',
        required: ['items'],
        properties: {
          items: { type: 'array', items: { type: 'string' } },
        },
      },
      GenerateClauseRequest: {
        type: 'object',
        required: ['request'],
        properties: {
          request: { type: 'string', minLength: 1, maxLength: 8000 },
        },
      },
      GenerateClauseResponse: {
        type: 'object',
        required: ['clause'],
        properties: {
          clause: { type: 'string' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' },
              details: { type: 'object' },
            },
          },
        },
      },
      RiskItem: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['risk', 'tip', 'warning'] },
          message: { type: 'string' },
        },
      },
      TimelinePhase: {
        type: 'object',
        properties: {
          phase: { type: 'string' },
          duration: { type: 'string' },
          deliverables: { type: 'string' },
        },
      },
      ATSRequest: {
        type: 'object',
        required: ['cvData', 'jobDescription'],
        properties: {
          cvData: { type: 'object', description: 'Dados do currículo em JSON' },
          jobDescription: { type: 'string', minLength: 1, maxLength: 20000 },
        },
      },
      ATSResponse: {
        type: 'object',
        properties: {
          score: { type: 'number' },
          found: { type: 'array', items: { type: 'string' } },
          missing: { type: 'array', items: { type: 'string' } },
          interview_tips: { type: 'array', items: { type: 'string' } },
        },
      },
      PixPaymentRequest: {
        type: 'object',
        properties: {
          amount: { type: 'number', example: 15.0 },
          description: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
      PixPaymentResponse: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          status: { type: 'string' },
          qr_code: { type: 'string' },
          qr_code_base64: { type: 'string' },
          ticket_url: { type: 'string' },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Firebase ID Token',
      },
    },
  },
};
