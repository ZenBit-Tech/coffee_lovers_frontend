import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { dateType, NotificationType, todayDate } from '@freelance/constants';

import { sendOfferHookDto, sendOfferHookReturnDto } from './types';

const useSendOfferHook = ({
  api,
  setConfirmLoading,
  setOpen,
  hourly_rate,
  error,
  isError,
  isSuccess,
}: sendOfferHookDto): sendOfferHookReturnDto => {
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
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      select: null,
      rate: hourly_rate,
      start: dayjs(todayDate, dateType),
    },
  });

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon(
        NotificationType.error,
        t('loginPage.notificationMessage'),
        t('modalInvite.offerError'),
      );
    }
    if (isSuccess) {
      openNotificationWithIcon(
        NotificationType.success,
        t('modalInvite.requestSuccessHeader'),
        t('modalInvite.offerSuccess'),
      );
      reset({ select: null, rate: hourly_rate });
    }
  }, [error, isError, isSuccess]);

  return {
    handleCancel,
    handleOk,
    handleSubmit,
    control,
    reset,
    register,
    errors,
    openNotificationWithIcon,
  };
};

export default useSendOfferHook;
