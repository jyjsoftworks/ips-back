import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../Shared/Infrastructure/config/config';


export default class JwtUtil {
    static generateToken(payload:object): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    };

    static verifyToken(token:string): any {
        return jwt.verify(token, JWT_SECRET);
    }
}