import dotenv from 'dotenv';

dotenv.config();

/**
 * @interface Environment
 * @description This interface defines the structure of the environment variables used in the application.
 */
export interface Environment {
  NODE_ENV: string;
  PORT: number;
  API_BASE_URL: string;
}

const variables: { [key: string]: string | undefined } = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.API_BASE_URL,
};

for (const [key, value] of Object.entries(variables)) {
  if (value === undefined) {
    console.error(`\r\x1b[31mError:\x1b[0m Variable ${key} is not defined`);
    process.exit(1);
  }
  if (value === '') {
    console.error(`\r\x1b[31mError:\x1b[0m Variable ${key} is empty`);
    process.exit(1);
  }
}

const port = Number(variables.PORT);

if (Number.isNaN(port)) {
  console.error('\r\x1b[31mError:\x1b[0m Variable PORT is not a number');
  process.exit(1);
}

export const environment: Environment = {
  PORT: port,
  NODE_ENV: process.env.NODE_ENV as string,
  API_BASE_URL: process.env.API_BASE_URL as string,
};
