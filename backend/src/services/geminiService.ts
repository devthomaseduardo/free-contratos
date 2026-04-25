import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-2.5-flash';

function getClient(apiKey: string): GoogleGenAI | null {
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

export async function refineServiceDescription(
  apiKey: string,
  rawInput: string
): Promise<string[]> {
  const ai = getClient(apiKey);
  if (!ai) return [rawInput];

  try {
    const prompt = `
      Atue como um Arquiteto de Software Sênior e Gerente de Produtos.

      Tarefa: Transforme a descrição bruta de serviços abaixo em uma lista profissional, técnica e objetiva para um contrato de desenvolvimento de software.

      Regras:
      1. Retorne APENAS um JSON array de strings. Nada mais.
      2. Use linguagem formal, clara e orientada a valor.
      3. Quebre em itens lógicos se necessário.

      Entrada Bruta: "${rawInput.replace(/"/g, '\\"')}"
    `;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const text = response.text;
    if (!text) return [rawInput];

    try {
      const parsed = JSON.parse(text) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map(String);
      }
      return [text];
    } catch {
      return [text];
    }
  } catch (error) {
    console.error('refineServiceDescription:', error);
    return [rawInput];
  }
}

export async function generateLegalClause(apiKey: string, request: string): Promise<string> {
  const ai = getClient(apiKey);
  if (!ai) {
    return 'Erro: GEMINI_API_KEY não configurada no servidor.';
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `
                Atue como um Advogado Especialista em Contratos de Tecnologia.
                Escreva uma cláusula contratual formal, direta e segura para o seguinte pedido: "${request.replace(/"/g, '\\"')}".

                Regras:
                - Use linguagem jurídica adequada (pt-BR).
                - Seja conciso, mas proteja as partes.
                - Não inclua explicações, apenas o texto da cláusula.
                - Comece o texto diretamente.
            `,
    });
    return response.text ?? '';
  } catch (error) {
    console.error('generateLegalClause:', error);
    return 'Erro ao gerar cláusula. Tente novamente.';
  }
}
