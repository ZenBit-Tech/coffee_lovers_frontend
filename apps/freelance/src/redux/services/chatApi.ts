import { io, Socket } from 'socket.io-client';
import {
  ApiRoutes,
  baseUrl,
  keepUnusedDataFor,
  websocketUrl,
} from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders, getWebsocketHeaders } from '@utils/api';
import {
  ConversationResponse,
  CreateMessagePayload,
  GetConversationParams,
  GetMessagesPayload,
  MessageResponse,
  SendMessagePayload,
} from 'redux/types/chat.types';

enum EndpointsRoutes {
  GET_MESSAGES = '/messages/',
}

export enum ChatEvents {
  CONNECT = 'connect',
  MESSAGE = 'message',
  JOIN_CONVERSATION = 'joinConversation',
  LEAVE_CONVERSATION = 'leaveConversation',
}

let socket: Socket;
let joinedConversations: number[] = [];

const getSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(websocketUrl, {
      extraHeaders: getWebsocketHeaders(token),
    });
  }

  return socket;
};

const joinConversation = (conversationId: number): void => {
  socket.emit(ChatEvents.JOIN_CONVERSATION, {
    conversation: conversationId,
  });
  joinedConversations.push(conversationId);
};

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.CHAT,
    prepareHeaders: getHeaders(),
  }),
  endpoints: build => ({
    getMessages: build.query<MessageResponse[], GetMessagesPayload>({
      query: payload => EndpointsRoutes.GET_MESSAGES + payload.conversation,
      keepUnusedDataFor,
      async onCacheEntryAdded(
        payload,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const socket = getSocket(payload.token);

        if (joinedConversations.length) {
          joinedConversations.forEach(conversationId => {
            socket.emit(ChatEvents.LEAVE_CONVERSATION, {
              conversation: conversationId,
            });
          });
          joinedConversations = [];
          joinConversation(payload.conversation);
        }

        socket.on(ChatEvents.CONNECT, () => {
          joinConversation(payload.conversation);
        });

        socket.on(ChatEvents.MESSAGE, message => {
          updateCachedData(draft => {
            draft.push(message);
          });
        });

        await cacheEntryRemoved;
        socket.removeAllListeners();
      },
    }),
    sendMessage: build.mutation<void, SendMessagePayload>({
      queryFn: (payload: SendMessagePayload) => {
        const socket = getSocket(payload.token);
        const message: CreateMessagePayload = {
          message: payload.message,
          conversation: payload.conversation,
        };

        return new Promise(resolve => {
          socket.emit(ChatEvents.MESSAGE, message);
        });
      },
    }),
    getConversation: build.query<ConversationResponse[], GetConversationParams>(
      {
        query: params => ({
          url: `/`,
          params,
        }),
      },
    ),
  }),
});

export const {
  useGetMessagesQuery,
  useGetConversationQuery,
  useSendMessageMutation,
} = chatApi;
