import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { useMarkNotificationsAsReadMutation } from 'redux/services/notificationsApi';
import { NotificationEvent } from 'redux/types/notifications.types';

export interface NotificationClickHandlers {
  message: (notification: NotificationEvent) => void;
  offerPage: (notification: NotificationEvent) => void;
  contractsPage: (notification: NotificationEvent) => void;
  proposal: (notification: NotificationEvent) => void;
  markAsRead: (notification: NotificationEvent) => void;
}

interface UseNotificationClickReturn {
  notificationClickHandlers: NotificationClickHandlers;
}

const useNotificationClick = (): UseNotificationClickReturn => {
  const navigate = useNavigate();
  const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

  const message = (notification: NotificationEvent): void => {
    navigate(
      generatePath(routes.chatUser, {
        userId: String(notification.user?.id),
        jobId: String(notification.job?.id),
      }),
    );
    markAsRead(notification);
  };

  const offerPage = (notification: NotificationEvent): void => {
    navigate(routes.offers);
    markAsRead(notification);
  };

  const contractsPage = (notification: NotificationEvent): void => {
    navigate(routes.contracts);
    markAsRead(notification);
  };

  const proposal = (notification: NotificationEvent): void => {
    navigate(
      generatePath(routes.proposalsList, {
        id: notification.job?.id,
      }),
    );
    markAsRead(notification);
  };

  const markAsRead = (notification: NotificationEvent): void => {
    markNotificationsAsRead([notification.id]);
  };

  return {
    notificationClickHandlers: {
      message,
      offerPage,
      contractsPage,
      proposal,
      markAsRead,
    },
  };
};

export default useNotificationClick;
