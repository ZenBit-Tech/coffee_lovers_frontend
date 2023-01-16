import { ApiRoutes, baseUrl } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import { NotificationEvent } from 'redux/types/notifications.types';

const serviceRoute = ApiRoutes.NOTIFICATIONS;

enum EndpointsRoutes {
  subscribe = '/subscribe?token=',
  getNotifications = '/',
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
            draft.push(JSON.parse(payload.data));
          });
        };
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
