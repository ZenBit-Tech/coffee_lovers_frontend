import { io, Socket } from 'socket.io-client';
import { ApiRoutes, baseUrl, websocketUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders, getWebsocketHeaders } from '@utils/api';
import {
  CreateMessagePayload,
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

const getSocket = (token: string) => {
  if (!socket) {
    socket = io(websocketUrl, {
      extraHeaders: getWebsocketHeaders(token),
    });
  }

  return socket;
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
      async onCacheEntryAdded(
        payload,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const socket = getSocket(payload.token);

        socket.on(ChatEvents.CONNECT, () => {
          socket.emit(ChatEvents.JOIN_CONVERSATION, {
            conversation: payload.conversation,
          });
        });

        socket.on(ChatEvents.MESSAGE, message => {
          updateCachedData(draft => {
            draft.push(message);
          });
        });

        await cacheEntryRemoved;
        socket.close();
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
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;
