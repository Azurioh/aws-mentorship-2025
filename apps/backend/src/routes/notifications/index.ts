import type { FastifyInstance } from 'fastify';
import ListNotifications from './list-notifications';
import ReadAllNotifications from './read-all-notifications';
import ReadNotification from './read-notification';
import DeleteNotification from './delete-notification';
import DeleteAllNotifications from './delete-all-notifications';

export default (app: FastifyInstance) => {
  ListNotifications(app);
  ReadAllNotifications(app);
  ReadNotification(app);
  DeleteNotification(app);
  DeleteAllNotifications(app);
};
