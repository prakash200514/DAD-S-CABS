import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'dads_cab_secure_jwt_secret_tamilnadu_2026',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/dads_cab_db',
  SERVICE_STATE: 'TAMIL_NADU',
  BOUNDS: {
    north: 13.55,
    south: 8.05,
    west: 76.20,
    east: 80.35,
  },
};
