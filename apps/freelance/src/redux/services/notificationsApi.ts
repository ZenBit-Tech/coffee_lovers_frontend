import { ApiRoutes, apiTags, baseUrl } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import { TypingEvents } from 'redux/types/chat.types';
import { NotificationEvent } from 'redux/types/notifications.types';

const serviceRoute = ApiRoutes.NOTIFICATIONS;

enum EndpointsRoutes {
  subscribe = '/subscribe?token=',
  getNotifications = '/',
  markAllNotificationsAsRead = '/markall',
}

const notificationApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<NotificationEvent[], string>({
      query: (token: string) => serviceRoute + EndpointsRoutes.getNotifications,
      async onCacheEntryAdded(
        token,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const eventSource = new EventSource(
          baseUrl + serviceRoute + EndpointsRoutes.subscribe + token,
        );

        eventSource.onmessage = (payload: MessageEvent<string>) => {
          updateCachedData(draft => {
            const event = JSON.parse(payload.data);
            if (
              event.type !== TypingEvents.STARTTYPING &&
              event.type !== TypingEvents.ENDTYPING
            ) {
              draft.unshift({ ...event, emitted: true });
            }
          });
        };

        await cacheEntryRemoved;
        eventSource.close();
      },
      providesTags: [apiTags.notification],
    }),
    markAllNotificationsAsRead: builder.mutation<void, void>({
      query: () => ({
        url: serviceRoute + EndpointsRoutes.markAllNotificationsAsRead,
        method: 'POST',
      }),
      invalidatesTags: [apiTags.notification],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} = notificationApi;
