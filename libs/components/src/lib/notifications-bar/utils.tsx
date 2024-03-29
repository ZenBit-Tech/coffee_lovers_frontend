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
import { NotificationClickHandlers } from 'src/hooks/useNotificationClick';
import { getFileUrl } from 'src/utils/api';
import { getTimeDate } from 'src/utils/dates';

import {
  ItemContainer,
  ItemDate,
  ItemIconContainer,
  ItemInfoContainer,
  ItemText,
  ItemTitle,
} from './styles';

export const getNotificationData = (
  notification: NotificationEvent,
  clickHandlers: NotificationClickHandlers,
  closeHandler: () => void,
): ReactNode => {
  switch (notification.type) {
    case NotificationType.MESSAGE:
      return getNotificationItem(
        `${notification.user?.first_name} ${notification.user?.last_name}`,
        <Avatar src={getFileUrl(notification.user?.profile_image)} />,
        notification.message || '',
        notification.created_at,
        clickHandler.bind(
          null,
          clickHandlers.message.bind(null, notification),
          closeHandler,
        ),
      );
      break;
    case NotificationType.NEW_OFFER:
      return getNotificationItem(
        t('notifications.bar.newOffer'),
        <WalletOutlined />,
        getJobTitleUserMessage(notification),
        notification.created_at,
        clickHandler.bind(
          null,
          clickHandlers.offerPage.bind(null, notification),
          closeHandler,
        ),
      );
      break;
    case NotificationType.ACCEPTED_OFFER:
      return getNotificationItem(
        t('notifications.bar.acceptedOffer'),
        <CheckCircleOutlined />,
        getUserJobTitleMessage(notification),
        notification.created_at,
        clickHandler.bind(
          null,
          clickHandlers.contractsPage.bind(null, notification),
          closeHandler,
        ),
      );
      break;
    case NotificationType.DECLINED_OFFER:
      return getNotificationItem(
        t('notifications.bar.declinedOffer'),
        <CloseCircleOutlined />,
        getUserJobTitleMessage(notification),
        notification.created_at,
        clickHandler.bind(
          null,
          clickHandlers.markAsRead.bind(null, notification),
          closeHandler,
        ),
      );
      break;
    case NotificationType.NEW_PROPOSAL:
      return getNotificationItem(
        t('notifications.bar.newProposal'),
        <PlusCircleOutlined />,
        getUserJobTitleMessage(notification),
        notification.created_at,
        clickHandler.bind(
          null,
          clickHandlers.proposal.bind(null, notification),
          closeHandler,
        ),
      );
      break;
    case NotificationType.NEW_INTERVIEW:
      return getNotificationItem(
        t('notifications.bar.newInterview'),
        <PlusCircleOutlined />,
        getUserJobTitleMessage(notification),
        notification.created_at,
        clickHandler.bind(
          null,
          clickHandlers.offerPage.bind(null, notification),
          closeHandler,
        ),
      );
      break;
    default:
      return '';
      break;
  }
};

const getNotificationItem = (
  title: string,
  icon: ReactNode,
  text: string,
  created_at: string,
  clickHandler?: () => void,
): ReactNode => {
  return (
    <ItemContainer key={created_at} onClick={clickHandler}>
      <ItemIconContainer>{icon}</ItemIconContainer>
      <ItemInfoContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemText>{text}</ItemText>
        <ItemDate>{getTimeDate(new Date(created_at))}</ItemDate>
      </ItemInfoContainer>
    </ItemContainer>
  );
};

const clickHandler = (
  notificationHandler: () => void,
  closeHandler: () => void,
): void => {
  notificationHandler();
  closeHandler();
};

const getUserJobTitleMessage = (notification: NotificationEvent): string => {
  return `${notification.user?.first_name} ${notification.user?.last_name}
  (${notification.job?.title})`;
};

const getJobTitleUserMessage = (notification: NotificationEvent): string => {
  return `${notification.job?.title}
  (${notification.user?.first_name} ${notification.user?.last_name})`;
};
