import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';
import { ProjectState } from '@test-connect/shared/enums/project';

extendZodWithOpenApi(z);

export const ProjectField = {
  id: z.string().uuid().openapi({
    description: 'The unique identifier for the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  name: z.string().openapi({
    description: 'The name of the project',
    example: 'My Project',
  }),
  description: z.string().openapi({
    description: 'The description of the project',
    example: 'This is a project description',
  }),
  state: z.nativeEnum(ProjectState).openapi({
    description: 'The state of the project',
    example: ProjectState.WAITING_TESTER,
  }),
  budget: z.number().positive().openapi({
    description: 'The budget of the project',
    example: 1000,
  }),
  duration: z.number().positive().openapi({
    description: 'The duration of the project',
    example: 10,
  }),
  developerUserId: z.string().uuid().openapi({
    description: 'The unique identifier for the developer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  haveTester: z.boolean().openapi({
    description: 'Whether the project has a tester',
    example: true,
  }),
  testerUserId: z.string().uuid().optional().openapi({
    description: 'The unique identifier for the tester',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  dueDate: z.date().openapi({
    description: 'The due date of the project',
    example: new Date(),
  }),
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
};

export const ProjectFields = {
  id: { id: ProjectField.id },
  name: { name: ProjectField.name },
  description: { description: ProjectField.description },
  state: { state: ProjectField.state },
  budget: { budget: ProjectField.budget },
  duration: { duration: ProjectField.duration },
  developerUserId: { developerUserId: ProjectField.developerUserId },
  haveTester: { haveTester: ProjectField.haveTester },
  testerUserId: { testerUserId: ProjectField.testerUserId },
  dueDate: { dueDate: ProjectField.dueDate },
  createdAt: { createdAt: ProjectField.createdAt },
  updatedAt: { updatedAt: ProjectField.updatedAt },
};

export const ProjectSchema = z.object({
  ...ProjectFields.id,
  ...ProjectFields.name,
  ...ProjectFields.description,
  ...ProjectFields.state,
  ...ProjectFields.budget,
  ...ProjectFields.duration,
  ...ProjectFields.developerUserId,
  ...ProjectFields.haveTester,
  ...ProjectFields.testerUserId,
  ...ProjectFields.dueDate,
  ...ProjectFields.createdAt,
  ...ProjectFields.updatedAt,
});
