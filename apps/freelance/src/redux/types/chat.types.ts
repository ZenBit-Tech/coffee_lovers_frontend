import { Job } from './jobs.types';
import { User } from './user.types';

export enum TypingEvents {
  ENDTYPING = 'endtype',
  STARTTYPING = 'typing',
}

export interface GetTypingPayload {
  type: TypingEvents;
  to: number;
}

export interface CreateMessagePayload {
  conversation: number;
  message: string;
  to?: number;
  job?: number;
}

export interface GetMessagesPayload {
  token: string;
  conversation: number;
}

export interface SendMessagePayload {
  token: string;
  conversation: number;
  message: string;
  to?: number;
  job?: number;
}

export interface TypingPayload {
  data: string;
}

export interface SetTypingPayload {
  token: string;
  to?: number;
  type: TypingEvents;
}

export interface CreateConversationPayload {
  job: number;
  user: number;
}

export interface MessageResponse {
  from: User;
  conversation: number;
  message: string;
  created_at: string;
}

export interface ConversationResponse {
  id: number;
  job: Job;
  user: User;
  last_message: {
    id: number;
    message: string;
    created_at: string;
    is_read: boolean;
  };
  new_messages: number;
}

export interface GetConversationParams {
  search?: string;
}

export interface ICurrentConversationInfo {
  ownerName: string;
  jobTitle: string;
  profileImg: string;
  jobDescription?: string;
  jobRate?: number;
  jobId?: number;
  freelancerId?: number;
}
