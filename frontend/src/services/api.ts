/**
 * Cliente da API REST. Em dev, o Vite faz proxy de `/api` para o backend.
 * Em produção, defina `VITE_API_BASE_URL` (ex.: https://api.seudominio.com).
 */
function apiBase(): string {
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  return base.replace(/\/$/, '');
}

async function parseError(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { error?: { message?: string } };
    return j.error?.message ?? res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function refineServiceDescription(rawInput: string): Promise<string[]> {
  const res = await fetch(`${apiBase()}/api/v1/ai/refine-services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawInput }),
  });
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  const data = (await res.json()) as { items: string[] };
  return data.items ?? [];
}

export async function generateLegalClause(request: string): Promise<string> {
  const res = await fetch(`${apiBase()}/api/v1/ai/generate-clause`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request }),
  });
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  const data = (await res.json()) as { clause: string };
  return data.clause ?? '';
}
