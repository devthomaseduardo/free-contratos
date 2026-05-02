import { VertexAI } from '@google-cloud/vertexai';

const project = process.env.GCP_PROJECT_ID || '';
const location = process.env.GCP_LOCATION || 'us-central1';

// O VertexAI usa ADC automaticamente se não passarmos chaves.
const vertex_ai = new VertexAI({ project, location });
const MODEL = 'gemini-1.5-flash';

const generativeModel = vertex_ai.getGenerativeModel({
  model: MODEL,
});

export async function refineServiceDescription(
  rawInput: string
): Promise<string[]> {
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

    const response = await generativeModel.generateContent(prompt);
    const text = response.response.candidates?.[0].content.parts?.[0].text;
    
    if (!text) return [rawInput];

    try {
      // Limpa possíveis marcações de markdown do JSON
      const jsonMatch = text.match(/\[.*\]/s);
      const cleanJson = jsonMatch ? jsonMatch[0] : text;
      
      const parsed = JSON.parse(cleanJson) as unknown;
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

export async function generateLegalClause(request: string): Promise<string> {
  try {
    const prompt = `
        Atue como um Advogado Especialista em Contratos de Tecnologia.
        Escreva uma cláusula contratual formal, direta e segura para o seguinte pedido: "${request.replace(/"/g, '\\"')}".

        Regras:
        - Use linguagem jurídica adequada (pt-BR).
        - Seja conciso, mas proteja as partes.
        - Não inclua explicações, apenas o texto da cláusula.
        - Comece o texto diretamente.
    `;

    const response = await generativeModel.generateContent(prompt);
    return response.response.candidates?.[0].content.parts?.[0].text ?? '';
  } catch (error) {
    console.error('generateLegalClause:', error);
    return 'Erro ao gerar cláusula. Tente novamente.';
  }
}

/**
 * Nova função para Análise de Currículo via IA (ATS)
 */
export async function analyzeATS(cvData: any, jobDescription: string): Promise<any> {
  try {
    const prompt = `
      Atue como um Especialista em Recrutamento e Seleção Tech (Tech Recruiter).
      
      Tarefa: Analise a aderência entre o Currículo (JSON) e a Descrição da Vaga (Texto).
      
      Currículo: ${JSON.stringify(cvData)}
      Vaga: "${jobDescription.replace(/"/g, '\\"')}"
      
      Retorne um JSON com:
      - score: (número de 0 a 100)
      - found: (array de strings com skills encontradas)
      - missing: (array de strings com skills ausentes mas importantes para a vaga)
      - interview_tips: (array de strings com perguntas técnicas e comportamentais específicas para essa vaga e empresa)
    `;

    const response = await generativeModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
    });

    const text = response.response.candidates?.[0].content.parts?.[0].text;
    return text ? JSON.parse(text) : { score: 0, found: [], missing: [], interview_tips: [] };
  } catch (error) {
    console.error('analyzeATS Error:', error);
    return { score: 0, error: 'Erro na análise de IA' };
  }
}
