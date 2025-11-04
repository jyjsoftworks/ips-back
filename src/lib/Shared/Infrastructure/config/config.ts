import dotenv from 'dotenv';
import type { Secret, SignOptions } from 'jsonwebtoken';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRATION as SignOptions['expiresIn']) || '1h';

export const DB_CONFIG = {
    dialect: process.env.DB_DIALECT as 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
};

