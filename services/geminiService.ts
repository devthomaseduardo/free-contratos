
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const refineServiceDescription = async (rawInput: string): Promise<string[]> => {
  if (!apiKey) {
    console.warn("API Key not found. Returning raw input.");
    return [rawInput];
  }

  try {
    const model = ai.models;
    const prompt = `
      Atue como um Arquiteto de Software Sênior e Gerente de Produtos.
      
      Tarefa: Transforme a descrição bruta de serviços abaixo em uma lista profissional, técnica e objetiva para um contrato de desenvolvimento de software.
      
      Regras:
      1. Retorne APENAS um JSON array de strings. Nada mais.
      2. Use linguagem formal, clara e orientada a valor.
      3. Quebre em itens lógicos se necessário.
      
      Entrada Bruta: "${rawInput}"
    `;

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return [rawInput];

    try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
            return parsed.map(String);
        }
        return [text];
    } catch (e) {
        return [text];
    }

  } catch (error) {
    console.error("Error generating content:", error);
    return [rawInput];
  }
};

export const generateLegalClause = async (request: string): Promise<string> => {
    if (!apiKey) return "Erro: API Key não configurada.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                Atue como um Advogado Especialista em Contratos de Tecnologia.
                Escreva uma cláusula contratual formal, direta e segura para o seguinte pedido: "${request}".
                
                Regras:
                - Use linguagem jurídica adequada (pt-BR).
                - Seja conciso, mas proteja as partes.
                - Não inclua explicações, apenas o texto da cláusula.
                - Comece o texto diretamente.
            `
        });
        return response.text || "";
    } catch (e) {
        console.error(e);
        return "Erro ao gerar cláusula. Tente novamente.";
    }
}
