import { ZodError } from 'zod';

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Payload inválido.',
        details: err.flatten(),
      },
    });
    return;
  }

  const message = err instanceof Error ? err.message : 'Erro interno.';
  console.error(err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message,
    },
  });
}
