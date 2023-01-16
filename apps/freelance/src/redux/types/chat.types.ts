import { Job } from './jobs.types';
import { User } from './user.types';

export interface CreateMessagePayload {
  conversation: number;
  message: string;
  to?: number;
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
