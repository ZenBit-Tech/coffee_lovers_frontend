import { ReactElement, useEffect, useState } from 'react';
import { Avatar, notification } from 'antd';
import { t } from 'i18next';
import { UserOutlined } from '@ant-design/icons';
import { useGetNotificationsQuery } from 'redux/services/notificationsApi';
import {
  NotificationEvent,
  NotificationIconType,
  NotificationType,
} from 'redux/types/notifications.types';
import useAppSelector from 'src/hooks/useAppSelector';
import { getFileUrl } from 'src/utils/api';

import { firstElementIndex, notificationPlacement } from './constants';

interface UseNotificationsReturn {
  notifications: NotificationEvent[];
  contextHolder: ReactElement<string>;
  isOpen: boolean;
  clickHandler: () => void;
}

const useNotifications = (): UseNotificationsReturn => {
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const { data } = useGetNotificationsQuery(access_token);
  const [api, contextHolder] = notification.useNotification();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openNotification = (
    message?: string,
    description?: string,
    type?: NotificationIconType,
    avatar?: string,
  ) => {
    const notificationPayload = {
      message,
      description,
      placement: notificationPlacement,
    };

    switch (type) {
      case NotificationIconType.MESSAGE:
        api.info({
          ...notificationPayload,
          icon: <Avatar src={getFileUrl(avatar)} icon={<UserOutlined />} />,
        });
        break;
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
    const notification = data?.at(firstElementIndex);
    if (notification && notification.emitted) {
      switch (notification.type) {
        case NotificationType.MESSAGE:
          openNotification(
            `${notification.user?.first_name} ${notification.user?.last_name}`,
            notification?.message,
            NotificationIconType.MESSAGE,
            notification.user?.profile_image,
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

  return {
    notifications: data || [],
    contextHolder,
    isOpen,
    clickHandler: () => setIsOpen(prev => !prev),
  };
};

export default useNotifications;
