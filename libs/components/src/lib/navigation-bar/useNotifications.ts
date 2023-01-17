import { useEffect } from 'react';
import { notification } from 'antd';
import { t } from 'i18next';
import { useGetNotificationsQuery } from 'redux/services/notificationsApi';
import {
  NotificationEvent,
  NotificationIconType,
  NotificationType,
} from 'redux/types/notifications.types';
import useAppSelector from 'src/hooks/useAppSelector';

import { lastElementIndex, notificationPlacement } from './constants';

const useNotifications = () => {
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const { data } = useGetNotificationsQuery(access_token);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    message?: string,
    description?: string,
    type?: NotificationIconType,
  ) => {
    const notificationPayload = {
      message,
      description,
      placement: notificationPlacement,
    };

    switch (type) {
      case NotificationIconType.SUCCESS:
        api.success(notificationPayload);
        break;
      case NotificationIconType.ERROR:
        api.error(notificationPayload);
        break;
      default:
        api.info(notificationPayload);
        break;
    }
  };

  useEffect(() => {
    const notification = data?.at(lastElementIndex);
    if (notification) {
      switch (notification.type) {
        case NotificationType.MESSAGE:
          openNotification(
            `${notification.user?.first_name} ${notification.user?.last_name}`,
            notification?.message,
          );
          break;
        case NotificationType.NEW_OFFER:
          openNotification(
            t('notifications.newOffer'),
            getJobTitleUserMessage(notification),
          );
          break;
        case NotificationType.ACCEPTED_OFFER:
          openNotification(
            t('notifications.acceptedOffer'),
            getJobTitleUserMessage(notification),
            NotificationIconType.SUCCESS,
          );
          break;
        case NotificationType.DECLINED_OFFER:
          openNotification(
            t('notifications.declinedOffer'),
            getJobTitleUserMessage(notification),
            NotificationIconType.ERROR,
          );
          break;
        case NotificationType.NEW_PROPOSAL:
          openNotification(
            t('notifications.newProposal'),
            getUserJobTitleMessage(notification),
          );
          break;
        case NotificationType.NEW_INTERVIEW:
          openNotification(
            t('notifications.newInterview'),
            getUserJobTitleMessage(notification),
          );
          break;
        default:
          break;
      }
    }
  }, [data]);

  const getJobTitleUserMessage = (notification: NotificationEvent): string => {
    return `${notification.job?.title}
    (${notification.user?.first_name} ${notification.user?.last_name})`;
  };

  const getUserJobTitleMessage = (notification: NotificationEvent): string => {
    return `${notification.user?.first_name} ${notification.user?.last_name}
    (${notification.job?.title})`;
  };

  return { contextHolder };
};

export default useNotifications;
