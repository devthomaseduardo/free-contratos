import admin from 'firebase-admin';

let isAuthInitialized = false;
try {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      projectId: 'devthmsite'
    });
  }
  isAuthInitialized = true;
} catch (e) {
  console.error('Falha ao inicializar Firebase Admin:', e.message);
}

export const authMiddleware = async (req, res, next) => {
  if (!isAuthInitialized) {
    console.warn('Auth Middleware: Ignorando validação pois Firebase Admin não foi inicializado.');
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  // Silently ignore "undefined" tokens from the frontend
  if (!idToken || idToken === 'undefined' || idToken === 'null') {
    return res.status(401).json({ error: 'Token inválido ou não autenticado.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    // Only log real errors, not malformed tokens
    if (error.code !== 'auth/argument-error') {
      console.error('Erro na validação do token:', error.message);
    }
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
