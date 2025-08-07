import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';
import { ProjectState } from '@test-connect/shared/enums/project';
import { UserFields } from './user';

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
  ownerId: UserFields.id,
  volunteersIds: z.array(UserFields.id),
  testerUserId: UserFields.id.nullable(),
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
  ownerId: { ownerId: ProjectField.ownerId },
  volunteersIds: { volunteersIds: ProjectField.volunteersIds },
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
  ...ProjectFields.ownerId,
  ...ProjectFields.volunteersIds,
  ...ProjectFields.testerUserId,
  ...ProjectFields.dueDate,
  ...ProjectFields.createdAt,
  ...ProjectFields.updatedAt,
});

export type TProject = z.infer<typeof ProjectSchema>;
