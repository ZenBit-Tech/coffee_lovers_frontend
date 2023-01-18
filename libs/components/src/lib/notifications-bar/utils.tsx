import { ReactNode } from 'react';
import { t } from 'i18next';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Avatar } from '@freelance/components';
import {
  NotificationEvent,
  NotificationType,
} from 'redux/types/notifications.types';
import { getFileUrl } from 'src/utils/api';
import { getTimeDate } from 'src/utils/dates';

interface NotificationData {
  title?: string;
  icon?: ReactNode;
  text?: string;
  date?: string;
}

export const getNotificationData = (
  notification: NotificationEvent,
): NotificationData => {
  switch (notification.type) {
    case NotificationType.MESSAGE:
      return {
        title: `${notification.user?.first_name} ${notification.user?.last_name}`,
        icon: <Avatar src={getFileUrl(notification.user?.profile_image)} />,
        text: notification.message,
        date: getTimeDate(new Date(notification.created_at)),
      };
      break;
    case NotificationType.NEW_OFFER:
      return {
        title: t('notifications.bar.newOffer'),
        icon: <WalletOutlined />,
        text: getJobTitleUserMessage(notification),
        date: getTimeDate(new Date(notification.created_at)),
      };
      break;
    case NotificationType.ACCEPTED_OFFER:
      return {
        title: t('notifications.bar.acceptedOffer'),
        icon: <CheckCircleOutlined />,
        text: getUserJobTitleMessage(notification),
        date: getTimeDate(new Date(notification.created_at)),
      };
      break;
    case NotificationType.DECLINED_OFFER:
      return {
        title: t('notifications.bar.declinedOffer'),
        icon: <CloseCircleOutlined />,
        text: getUserJobTitleMessage(notification),
        date: getTimeDate(new Date(notification.created_at)),
      };
      break;
    case NotificationType.NEW_PROPOSAL:
      return {
        title: t('notifications.bar.newProposal'),
        icon: <PlusCircleOutlined />,
        text: getUserJobTitleMessage(notification),
        date: getTimeDate(new Date(notification.created_at)),
      };
      break;
    case NotificationType.NEW_INTERVIEW:
      return {
        title: t('notifications.bar.newInterview'),
        icon: <PlusCircleOutlined />,
        text: getUserJobTitleMessage(notification),
        date: getTimeDate(new Date(notification.created_at)),
      };
      break;
    default:
      return {};
      break;
  }
};

const getUserJobTitleMessage = (notification: NotificationEvent): string => {
  return `${notification.user?.first_name} ${notification.user?.last_name}
  (${notification.job?.title})`;
};

const getJobTitleUserMessage = (notification: NotificationEvent): string => {
  return `${notification.job?.title}
  (${notification.user?.first_name} ${notification.user?.last_name})`;
};
