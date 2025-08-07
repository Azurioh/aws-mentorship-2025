import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';
import { UserFields } from './user';

extendZodWithOpenApi(z);

export const NotificationField = {
  id: z.string().uuid().openapi({
    description: 'The unique identifier for the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  userId: UserFields.id,
  title: z.string().openapi({
    description: 'The title of the notification',
    example: 'New project',
  }),
  content: z.string().openapi({
    description: 'The content of the notification',
    example: 'A new project has been created',
  }),
  read: z.boolean().openapi({
    description: 'Whether the notification has been read',
    example: false,
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
};

export const NotificationFields = {
  id: { id: NotificationField.id },
  userId: { userId: NotificationField.userId },
  title: { title: NotificationField.title },
  content: { content: NotificationField.content },
  read: { read: NotificationField.read },
  createdAt: { createdAt: NotificationField.createdAt },
};

export const NotificationSchema = z.object({
  ...NotificationFields.id,
  ...NotificationFields.userId,
  ...NotificationFields.title,
  ...NotificationFields.content,
  ...NotificationFields.read,
  ...NotificationFields.createdAt,
});

export type TNotification = z.infer<typeof NotificationSchema>;
