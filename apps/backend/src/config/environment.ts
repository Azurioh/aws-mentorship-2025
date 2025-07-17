import Logger from '@utils/logger';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @interface Environment
 * @description This interface defines the structure of the environment variables used in the application.
 */
export interface Environment {
  PORT: number /*!< Port for the Express server */;
  API_BASE_URL: string /*!< Base url of the API */;
  NODE_ENV: string /*!< Environment of the application */;
  AWS_KEY: string /*!< AWS key for the application */;
  AWS_SECRET: string /*!< AWS secret for the application */;
  REGION: string /*!< Region for the application */;
  PROJECTS_TABLE: string /*!< AWS bucket name for the application */;
  JWT_SECRET: string /*!< JWT secret for the application */;
}

const variables: { [key: string]: string | undefined } = {
  PORT: process.env.PORT,
  API_BASE_URL: process.env.API_BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  AWS_KEY: process.env.AWS_KEY,
  AWS_SECRET: process.env.AWS_SECRET,
  REGION: process.env.REGION,
  PROJECTS_TABLE: process.env.PROJECTS_TABLE,
  JWT_SECRET: process.env.JWT_SECRET,
};

for (const [key, value] of Object.entries(variables)) {
  if (value === undefined) {
    Logger.getInstance().error(`Variable ${key} is not defined`);
    process.exit(1);
  }
  if (value === '') {
    Logger.getInstance().error(`Variable ${key} is empty`);
    process.exit(1);
  }
}

const port = Number(variables.PORT);

if (Number.isNaN(port)) {
  Logger.getInstance().error('Variable PORT is not a number');
  process.exit(1);
}

export const environment: Environment = {
  PORT: port,
  API_BASE_URL: process.env.API_BASE_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
  AWS_KEY: process.env.AWS_KEY as string,
  AWS_SECRET: process.env.AWS_SECRET as string,
  REGION: process.env.REGION as string,
  PROJECTS_TABLE: process.env.PROJECTS_TABLE as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
