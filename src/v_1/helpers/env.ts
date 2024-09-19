import dotenv from 'dotenv';
dotenv.config();

import Process from 'process';

enum Environments {
  LOCAL = 'LOCAL',
  DEV = 'DEV',
  STAGING = 'STAGING',
  PROD = 'PROD',
}

export const Server = {
  PORT: parseInt(Process.env.PORT as string) || 8000,
  ENVIRONMENT: Process.env.ENV as Environments,
  IS_DEV_ENV: (Process.env.ENV as Environments) === Environments.DEV,
  IS_LOCAL_ENV: (Process.env.ENV as Environments) === Environments.LOCAL,
};

export const Jwt = {
  JWT_SECRET: Process.env.jwtSecret as string,
};

export const Hash = {
  SALT: (Process.env.salt as string) || '10',
};
export const LoggerLevel = {
  LOG_LEVEL: Process.env.LOG_LEVEL || 'debug',
};

export const Database = {
  DB_USER: Process.env.DB_USER as string,
  DB_NAME: Process.env.DB_NAME as string,
  DB_PASSWORD: Process.env.DB_PASSWORD as string,
  DB_HOST: Process.env.DB_HOST as string,
  MIGRATOR_DB_HOST: Process.env.MIGRATOR_DB_HOST as string,
};

export const Swagger = {
  PATH: Process.env.SWAGGER_PATH || '/api-docs',
};

export const AWS = {
  REGION: Process.env.AWS_REGION as string,
  ACCESS_KEY_ID: Process.env.AWS_ACCESS_KEY_ID as string,
  SECRET_ACCESS_KEY: Process.env.AWS_SECRET_ACCESS_KEY as string,
  BUCKET_NAME: Process.env.AWS_S3_BUCKET_NAME as string,
};

export const ENV = {
  Server,
  Jwt,
  LoggerLevel,
  Database,
  Swagger,
  AWS,
};
