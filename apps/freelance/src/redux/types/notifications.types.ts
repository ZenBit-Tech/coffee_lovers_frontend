import { Job } from './jobs.types';
import { User } from './user.types';

export interface NotificationEvent {
  type: NotificationType;
  user?: User;
  job?: Job;
  message?: string;
}

export enum NotificationType {
  MESSAGE = 'message',
  NEW_OFFER = 'newOffer',
  ACCEPTED_OFFER = 'acceptedOffer',
  DECLINED_OFFER = 'declinedOffer',
  NEW_PROPOSAL = 'newProposal',
  NEW_INTERVIEW = 'newInterview',
}

export enum NotificationIconType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  MESSAGE = 'message',
}
