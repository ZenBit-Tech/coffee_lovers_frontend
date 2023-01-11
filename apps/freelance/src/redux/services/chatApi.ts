import { io, Socket } from 'socket.io-client';
import {
  ApiRoutes,
  baseUrl,
  chatApiTags,
  websocketUrl,
} from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders, getWebsocketHeaders } from '@utils/api';
import {
  ConversationResponse,
  CreateConversationPayload,
  CreateMessagePayload,
  GetConversationParams,
  GetMessagesPayload,
  MessageResponse,
  SendMessagePayload,
} from 'redux/types/chat.types';

enum EndpointsRoutes {
  GET_MESSAGES = '/messages/',
  CREATE_CONVERSATION = '/',
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
  tagTypes: Object.values(chatApiTags),
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
    getConversation: build.query<ConversationResponse[], GetConversationParams>(
      {
        query: params => ({
          url: `/`,
          params,
        }),
        providesTags: [chatApiTags.conversation],
      },
    ),
    createConversation: build.mutation({
      query: (body: CreateConversationPayload) => ({
        url: EndpointsRoutes.CREATE_CONVERSATION,
        method: 'POST',
        body,
      }),
      invalidatesTags: [chatApiTags.conversation],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetConversationQuery,
  useSendMessageMutation,
  useCreateConversationMutation,
} = chatApi;
