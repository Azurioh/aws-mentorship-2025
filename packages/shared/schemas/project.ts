import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';
import { ProjectState } from '@test-connect/shared/enums/project';

extendZodWithOpenApi(z);

export const ProjectFields = {
  id: {
    id: z.string().uuid().openapi({
      description: 'The unique identifier for the project',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  },
  name: {
    name: z.string().openapi({
      description: 'The name of the project',
      example: 'My Project',
    }),
  },
  description: {
    description: z.string().openapi({
      description: 'The description of the project',
      example: 'This is a project description',
    }),
  },
  state: {
    state: z.nativeEnum(ProjectState).openapi({
      description: 'The state of the project',
      example: ProjectState.WAITING_TESTER,
    }),
  },
  budget: {
    budget: z.number().positive().openapi({
      description: 'The budget of the project',
      example: 1000,
    }),
  },
  duration: {
    duration: z.number().positive().openapi({
      description: 'The duration of the project',
      example: 10,
    }),
  },
  developerUserId: {
    developerUserId: z.string().uuid().openapi({
      description: 'The unique identifier for the developer',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  },
  haveTester: {
    haveTester: z.boolean().openapi({
      description: 'Whether the project has a tester',
      example: true,
    }),
  },
  testerUserId: {
    testerUserId: z.string().uuid().optional().openapi({
      description: 'The unique identifier for the tester',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  },
  dueDate: {
    dueDate: z.date().openapi({
      description: 'The due date of the project',
      example: new Date(),
    }),
  },
  createdAt: {
    createdAt: z.union([
      z.date().openapi({
        description: 'The creation date',
        example: new Date(),
      }),
      z.string().openapi({
        description: 'The creation date (as a string in ISO format)',
        example: new Date().toISOString(),
      }),
    ]),
  },
  updatedAt: {
    updatedAt: z.union([
      z.date().openapi({
        description: 'The last update date',
        example: new Date(),
      }),
      z.string().openapi({
        description: 'The last update date (as a string in ISO format)',
        example: new Date().toISOString(),
      }),
    ]),
  },
};
