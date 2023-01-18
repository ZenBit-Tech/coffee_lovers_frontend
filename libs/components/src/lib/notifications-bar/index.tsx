import { FC } from 'react';
import { Button } from 'antd';
import { t } from 'i18next';
import { CloseOutlined } from '@ant-design/icons';
import { Empty } from '@freelance/components';
import { useMarkAllNotificationsAsReadMutation } from 'redux/services/notificationsApi';
import { NotificationEvent } from 'redux/types/notifications.types';

import {
  ButtonsContainer,
  ClearButton,
  ItemContainer,
  ItemDate,
  ItemIconContainer,
  ItemInfoContainer,
  ItemText,
  ItemTitle,
  Wrapper,
} from './styles';
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
      {notifications
        ?.map(item => getNotificationData(item))
        .map(item => (
          <ItemContainer key={item.date}>
            <ItemIconContainer>{item.icon}</ItemIconContainer>

            <ItemInfoContainer>
              <ItemTitle>{item.title}</ItemTitle>

              <ItemText>{item.text}</ItemText>

              <ItemDate>{item.date}</ItemDate>
            </ItemInfoContainer>
          </ItemContainer>
        ))}
      {!notifications?.length && (
        <Empty description={t('notifications.bar.noDataPlaceholder')} />
      )}
    </Wrapper>
  );
};
