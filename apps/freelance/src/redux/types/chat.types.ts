import { User } from './user.types';

export interface CreateMessagePayload {
  conversation: number;
  message: string;
}

export interface GetMessagesPayload {
  token: string;
  conversation: number;
}

export interface SendMessagePayload {
  token: string;
  conversation: number;
  message: string;
}

export interface MessageResponse {
  from: User;
  conversation: number;
  message: string;
  created_at: string;
}
