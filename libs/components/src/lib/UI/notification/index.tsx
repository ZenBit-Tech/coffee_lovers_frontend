import { ReactElement } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface useOpenNotificationReturns {
  contextHolder?: ReactElement<string>;
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
}

export const useOpenNotification = (): useOpenNotificationReturns => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message,
      description,
    });
  };

  return {
    contextHolder,
    openNotificationWithIcon,
  };
};
