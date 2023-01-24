import { FC } from 'react';
import { Button } from 'antd';
import { t } from 'i18next';
import { CloseOutlined } from '@ant-design/icons';
import { Empty } from '@freelance/components';
import { useMarkAllNotificationsAsReadMutation } from 'redux/services/notificationsApi';
import { NotificationEvent } from 'redux/types/notifications.types';
import useNotificationClick from 'src/hooks/useNotificationClick';

import { ButtonsContainer, ClearButton, Wrapper } from './styles';
import { getNotificationData } from './utils';

interface NotificationsBarProps {
  notifications?: NotificationEvent[];
  closeHandler: () => void;
}

export const NotificationsBar: FC<NotificationsBarProps> = ({
  notifications,
  closeHandler,
}) => {
  const [markAllNotificationsAsRead] = useMarkAllNotificationsAsReadMutation();
  const { notificationClickHandlers } = useNotificationClick();

  return (
    <Wrapper onClick={e => e.stopPropagation()}>
      {!!notifications?.length && (
        <ButtonsContainer>
          <ClearButton
            onClick={() => {
              markAllNotificationsAsRead();
              closeHandler();
            }}
          >
            {t('notifications.bar.markAsRead')}
          </ClearButton>
          <Button onClick={closeHandler}>
            <CloseOutlined />
          </Button>
        </ButtonsContainer>
      )}
      {notifications?.map(item =>
        getNotificationData(item, notificationClickHandlers, closeHandler),
      )}
      {!notifications?.length && (
        <Empty description={t('notifications.bar.noDataPlaceholder')} />
      )}
    </Wrapper>
  );
};
