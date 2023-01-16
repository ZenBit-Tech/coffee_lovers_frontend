import { User } from './user.types';

export interface NotificationEvent {
  type: NotificationType;
  user?: User;
  message?: string;
}

export enum NotificationType {
  MESSAGE = 'message',
  OFFER = 'offer',
}
