import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NotificationType } from '@freelance/constants';

import { sendInviteHookDto, sendInviteHookReturnDto } from './types';

const useInterviewModalHook = ({
  api,
  setConfirmLoading,
  setOpen,
  hourly_rate,
  isSuccess,
  isError,
  error,
}: sendInviteHookDto): sendInviteHookReturnDto => {
  const { t } = useTranslation();

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

  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      select: null,
      rate: hourly_rate,
    },
  });

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon(
        NotificationType.error,
        t('loginPage.notificationMessage'),
        t('modalInvite.requestError'),
      );
    }
    if (isSuccess) {
      openNotificationWithIcon(
        NotificationType.success,
        t('modalInvite.requestSuccessHeader'),
        t('modalInvite.requestSuccess'),
      );
      reset({ select: null, rate: hourly_rate });
    }
  }, [error, isError, isSuccess]);

  return {
    handleCancel,
    handleOk,
    handleSubmit,
    control,
    register,
    errors,
    openNotificationWithIcon,
  };
};

export default useInterviewModalHook;
