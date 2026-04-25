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
    },
  },
} as const;
