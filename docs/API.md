# Documentação da API REST

Versão da API: **v1**  
Prefixo base: **`/api/v1`**

Esta API expõe integrações que **não devem rodar no navegador** (por exemplo, chamadas ao Google Gemini com chave secreta). O frontend React consome estes endpoints via `fetch`; em desenvolvimento, o Vite encaminha `/api` para o backend (proxy).

---

## Sumário

| Método | Caminho | Descrição |
|--------|---------|-----------|
| GET | `/api/v1/health` | Verificação de saúde e metadados |
| POST | `/api/v1/ai/refine-services` | Refino de texto bruto em lista de serviços para contrato |
| POST | `/api/v1/ai/generate-clause` | Geração de cláusula contratual em pt-BR |
| GET | `/api/v1/docs` | **Swagger UI** (documentação interativa) |
| GET | `/api/v1/openapi.json` | Especificação **OpenAPI 3.0** em JSON |

---

## Autenticação

Nesta versão de referência **não há JWT nem API key de cliente**. A proteção do modelo de IA é feita mantendo `GEMINI_API_KEY` **apenas no servidor**. Para produção, o entrevistador esperará ouvir sobre: rate limiting, autenticação de usuários, WAF e rotação de chaves.

---

## Formato de erros

Respostas de erro seguem o padrão:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Payload inválido.",
    "details": {}
  }
}
```

- **400** — corpo JSON inválido ou campos fora dos limites (validação Zod).  
- **500** — falha não tratada (detalhes no log do servidor).

---

## Endpoints

### GET `/api/v1/health`

**Resposta 200**

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-04-25T12:00:00.000Z",
  "geminiConfigured": true
}
```

- `geminiConfigured`: indica se `GEMINI_API_KEY` está definida no ambiente do processo Node.

---

### POST `/api/v1/ai/refine-services`

Transforma uma descrição informal em uma **lista de strings** adequadas a contratos de software. Se a chave Gemini não estiver configurada, o servidor devolve `[rawInput]` (comportamento degradado).

**Corpo (JSON)**

| Campo | Tipo | Obrigatório | Limite |
|--------|------|-------------|--------|
| `rawInput` | string | sim | 8000 caracteres |

**Exemplo de requisição**

```http
POST /api/v1/ai/refine-services HTTP/1.1
Host: localhost:4000
Content-Type: application/json

{
  "rawInput": "site institucional com blog e formulário"
}
```

**Resposta 200**

```json
{
  "items": [
    "Desenvolvimento de site institucional responsivo",
    "Implementação de blog com CMS",
    "Formulário de contato com integração a e-mail ou CRM"
  ]
}
```

---

### POST `/api/v1/ai/generate-clause`

Gera **texto de cláusula** a partir de um pedido em linguagem natural.

**Corpo (JSON)**

| Campo | Tipo | Obrigatório | Limite |
|--------|------|-------------|--------|
| `request` | string | sim | 8000 caracteres |

**Exemplo**

```http
POST /api/v1/ai/generate-clause HTTP/1.1
Content-Type: application/json

{
  "request": "Multa de 10% por atraso no pagamento após 5 dias do vencimento"
}
```

**Resposta 200**

```json
{
  "clause": "CLÁUSULA X — DO INADIMPLEMENTO\n\n..."
}
```

Se `GEMINI_API_KEY` estiver ausente, o corpo ainda será 200, porém `clause` conterá mensagem informando a falta de configuração.

---

## CORS

A variável `FRONTEND_ORIGIN` (ou lista separada por vírgula) define origens permitidas. Padrão de desenvolvimento: `http://localhost:3000`.

---

## OpenAPI e Swagger

- **Swagger UI:** abra no navegador `http://localhost:4000/api/v1/docs` com o backend em execução.  
- **JSON bruto:** `http://localhost:4000/api/v1/openapi.json` (útil para importar em Postman ou gerar clientes).

A fonte canônica do contrato em código está em `backend/src/openapi.ts` (objeto consumido pelo `swagger-ui-express`).

---

## Boas práticas citáveis em entrevista

1. **Separação de responsabilidades:** UI não carrega SDK de IA nem chaves.  
2. **Validação de entrada:** limites de tamanho e schema (Zod) antes de chamar o provedor.  
3. **Contrato explícito:** OpenAPI versionada junto ao código.  
4. **Observabilidade:** logs de erro no servidor; health check para orquestração (Kubernetes, load balancer).  
5. **Próximos passos típicos:** autenticação, idempotência, filas para chamadas longas, cache de respostas idênticas.
