const parseOrigins = (raw) => {
  if (!raw?.trim()) return ['http://localhost:3000'];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
};

export const config = {
  port: Number(process.env.PORT) || 4000,
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGIN),
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
