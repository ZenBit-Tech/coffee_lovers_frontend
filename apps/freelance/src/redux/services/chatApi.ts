import { io, Socket } from 'socket.io-client';
import {
  ApiRoutes,
  apiTags,
  baseUrl,
  keepUnusedDataFor,
  websocketUrl,
} from '@freelance/constants';
import { getWebsocketHeaders } from '@utils/api';
import { emptySplitApi } from 'redux/emptySplitApi';
import {
  ConversationResponse,
  CreateConversationPayload,
  CreateMessagePayload,
  GetConversationParams,
  GetMessagesPayload,
  GetTypingPayload,
  MessageResponse,
  SendMessagePayload,
  SetTypingPayload,
  TypingPayload,
} from 'redux/types/chat.types';

const serviceRoute = ApiRoutes.CHAT;

enum EndpointsRoutes {
  getConversation = '/',
  getMessages = '/messages/',
  createConversation = '/',
  getTypeEvent = '/type?token=',
  sendType = '/typing',
}

export enum ChatEvents {
  CONNECT = 'connect',
  MESSAGE = 'message',
  JOIN_CONVERSATION = 'joinConversation',
  LEAVE_CONVERSATION = 'leaveConversation',
  SENDTYPE = 'typing',
}

let socket: Socket;
let joinedConversations: number[] = [];

const getSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(websocketUrl, {
      extraHeaders: getWebsocketHeaders(token),
      withCredentials: true,
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

export const leaveAllConversations = (): void => {
  if (joinedConversations.length) {
    joinedConversations.forEach(conversationId => {
      socket.emit(ChatEvents.LEAVE_CONVERSATION, {
        conversation: conversationId,
      });
    });
    joinedConversations = [];
  }
};

const chatApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    getMessages: build.query<MessageResponse[], GetMessagesPayload>({
      query: payload =>
        serviceRoute + EndpointsRoutes.getMessages + payload.conversation,
      keepUnusedDataFor,
      async onCacheEntryAdded(
        payload,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const socket = getSocket(payload.token);
        leaveAllConversations();
        joinConversation(payload.conversation);

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
          to: payload.to,
          job: payload.job,
        };

        return new Promise(resolve => {
          socket.emit(ChatEvents.MESSAGE, message);
        });
      },
    }),
    sendTypeEvent: build.mutation<void, SetTypingPayload>({
      queryFn: (payload: SetTypingPayload) => {
        const socket = getSocket(payload.token);
        const message: SetTypingPayload = {
          ...payload,
        };

        return new Promise(resolve => {
          socket.emit(ChatEvents.SENDTYPE, message);
        });
      },
    }),
    getTypeEvent: build.query<GetTypingPayload[], string>({
      queryFn: (token: string) => ({ data: [] }),
      async onCacheEntryAdded(
        token,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const eventSource = new EventSource(
          baseUrl + serviceRoute + EndpointsRoutes.getTypeEvent + token,
        );

        eventSource.onmessage = (payload: TypingPayload) => {
          const event = JSON.parse(payload.data);
          updateCachedData(draft => {
            draft.unshift(event);
          });
        };

        await cacheEntryRemoved;
        eventSource.close();
      },
    }),

    getConversation: build.query<ConversationResponse[], GetConversationParams>(
      {
        query: params => ({
          url: serviceRoute + EndpointsRoutes.getConversation,
          params,
        }),
        providesTags: [apiTags.conversation],
        keepUnusedDataFor,
      },
    ),
    createConversation: build.mutation({
      query: (body: CreateConversationPayload) => ({
        url: serviceRoute + EndpointsRoutes.createConversation,
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
  useGetTypeEventQuery,
  useSendTypeEventMutation,
} = chatApi;
