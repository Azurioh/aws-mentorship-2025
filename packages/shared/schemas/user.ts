import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';
import { UserType } from '@test-connect/shared/enums/user';

extendZodWithOpenApi(z);

/**
 * @constant UserFields
 * @description The fields for the user
 */
export const UserFields = {
  id: z.string().uuid().openapi({
    description: 'The unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  username: z.string().openapi({
    description: 'The username of the user',
    example: 'john_doe',
  }),
  email: z.string().email().openapi({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  }),
  passwordHash: z.string().openapi({
    description: "The hash of the user's password",
    example: '1234567890',
  }),
  type: z.nativeEnum(UserType).openapi({
    description: 'The type of user',
    example: UserType.DEVELOPER,
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

/**
 * @constant UserSchema
 * @description The schema for the user
 */
export const UserSchema = z.object(UserFields);

/**
 * @type User
 * @description The schema for the user
 */
export type User = z.infer<typeof UserSchema>;

/**
 * @constant UserTokenFields
 * @description The fields for the user token
 */
export const UserTokenFields = {
  id: UserFields.id,
  username: UserFields.username,
  email: UserFields.email,
  type: UserFields.type,
};

/**
 * @constant UserTokenSchema
 * @description The schema for the user token
 */
export const UserTokenSchema = z.object(UserTokenFields);

/**
 * @type UserToken
 * @description The type for the user token
 */
export type UserToken = z.infer<typeof UserTokenSchema>;
