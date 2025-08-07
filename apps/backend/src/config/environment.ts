import Logger from '@utils/logger';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @interface Environment
 * @description This interface defines the structure of the environment variables used in the application.
 */
export interface Environment {
  NODE_ENV: string /*!< Environment of the application */;
  AWS_KEY: string /*!< AWS key for the application */;
  AWS_SECRET: string /*!< AWS secret for the application */;
  REGION: string /*!< Region for the application */;
  STAGE: string /*!< Stage for the application */;
  PROJECTS_TABLE: string /*!< AWS bucket name for the application */;
  JWT_SECRET: string /*!< JWT secret for the application */;
  COGNITO_ID: string /*!< User pool id */;
}

const variables: { [key: string]: string | undefined } = {
  NODE_ENV: process.env.NODE_ENV,
  AWS_KEY: process.env.AWS_KEY,
  AWS_SECRET: process.env.AWS_SECRET,
  REGION: process.env.REGION,
  STAGE: process.env.STAGE,
  PROJECTS_TABLE: process.env.PROJECTS_TABLE,
  JWT_SECRET: process.env.JWT_SECRET,
  COGNITO_ID: process.env.COGNITO_ID,
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

export const environment: Environment = {
  NODE_ENV: process.env.NODE_ENV as string,
  AWS_KEY: process.env.AWS_KEY as string,
  AWS_SECRET: process.env.AWS_SECRET as string,
  REGION: process.env.REGION as string,
  STAGE: process.env.STAGE as string,
  PROJECTS_TABLE: process.env.PROJECTS_TABLE as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  COGNITO_ID: process.env.COGNITO_ID as string,
};
