import { useEffect } from 'react';
import { notification } from 'antd';
import { useGetNotificationsQuery } from 'redux/services/notificationsApi';
import { NotificationType } from 'redux/types/notifications.types';
import useAppSelector from 'src/hooks/useAppSelector';

const useNotifications = () => {
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const { data } = useGetNotificationsQuery(access_token);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message?: string, description?: string) => {
    api.info({
      message,
      description,
      placement: 'bottomRight',
    });
  };

  useEffect(() => {
    const notification = data?.at(-1);
    if (notification) {
      if (notification.type === NotificationType.MESSAGE) {
        openNotification(
          `${notification?.user?.first_name} ${notification?.user?.last_name}`,
          notification?.message,
        );
      }
    }
  }, [data]);

  return { contextHolder };
};

export default useNotifications;
