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
  category:  z.string().openapi({
    description: 'The category of the project',
    example: 'Web application',
  }),
  skills: z.array(z.string()),
  applicants: z.number(),
  ownerId: UserFields.id,
  volunteersIds: z.array(UserFields.id),
  testerUserId: UserFields.id.nullable(),
  dueDate: z.string().openapi({
    description: 'The due date of the project',
    example: new Date().toISOString(),
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
  skills: { skills: ProjectField.skills },
  applicants: { applicants: ProjectField.applicants },
  category: { category: ProjectField.category }
};

export const ProjectSchema = z.object({
  ...ProjectField,
});

export type TProject = z.infer<typeof ProjectSchema>;
