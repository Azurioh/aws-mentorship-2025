import dotenv from 'dotenv';

dotenv.config();

/**
 * @interface Environment
 * @description This interface defines the structure of the environment variables used in the application.
 */
export interface Environment {
  PORT: number /*!< Port for the Express server */;
  API_BASE_URL: string /*!< Base url of the API */;
  MONGO_URI: string /*!< URL of the database */;
  NODE_ENV: string /*!< Environment of the application */;
}

const variables: { [key: string]: string | undefined } = {
  PORT: process.env.PORT,
  API_BASE_URL: process.env.API_BASE_URL,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
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
  API_BASE_URL: process.env.API_BASE_URL as string,
  MONGO_URI: process.env.MONGO_URI as string,
  NODE_ENV: process.env.NODE_ENV as string,
};
