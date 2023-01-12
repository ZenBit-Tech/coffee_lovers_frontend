import { io, Socket } from 'socket.io-client';
import { ApiRoutes, apiTags, websocketUrl } from '@freelance/constants';
import { getWebsocketHeaders } from '@utils/api';
import { emptySplitApi } from 'redux/emptySplitApi';
import {
  ConversationResponse,
  CreateConversationPayload,
  CreateMessagePayload,
  GetConversationParams,
  GetMessagesPayload,
  MessageResponse,
  SendMessagePayload,
} from 'redux/types/chat.types';

const serviceRoute = ApiRoutes.CHAT;

enum EndpointsRoutes {
  getConversation = '/',
  getMessages = '/messages/',
  createConversation = '/',
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

const chatApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    getMessages: build.query<MessageResponse[], GetMessagesPayload>({
      query: payload =>
        serviceRoute + EndpointsRoutes.getMessages + payload.conversation,
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
          url: serviceRoute + EndpointsRoutes.getConversation,
          params,
        }),
        providesTags: [apiTags.conversation],
      },
    ),
    createConversation: build.mutation({
      query: (body: CreateConversationPayload) => ({
        url: EndpointsRoutes.createConversation,
        method: 'POST',
        body,
      }),
      invalidatesTags: [apiTags.conversation],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetConversationQuery,
  useSendMessageMutation,
  useCreateConversationMutation,
} = chatApi;
