// lib/utils/checkAuth.ts
import { Request, Response, NextFunction } from 'express';
import JwtUtil from './JwtUtil';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'No se encontró un token en las cookies ni en el header' });
  }

  try {
    const decoded = JwtUtil.verifyToken(token);
    req.user = decoded; 
    return next();
  } catch (err: any) {
    console.error('Error al verificar el token:', err?.message || err);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export default checkAuth;
