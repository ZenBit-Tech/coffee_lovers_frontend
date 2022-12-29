import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { dateType, NotificationType, todayDate } from '@freelance/constants';
import { usePostRequestMutation } from 'src/redux/invite/inviteApi';
import { Invite } from 'src/redux/invite/types';

import { sendOfferHookReturnDto } from '../send-offer-modal/types';

import { sendInviteHookDto } from './types';

const useSendOfferHook = ({
  id,
  setJobId,
  api,
  description,
  setConfirmLoading,
  setOpen,
  hourly_rate,
}: sendInviteHookDto): sendOfferHookReturnDto => {
  const [postRequest, { isError, isSuccess }] = usePostRequestMutation();
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
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      select: null,
      rate: hourly_rate || '',
      start: dayjs(todayDate, dateType),
    },
  });

  const onSubmit = async (payload: {
    select: number | null;
    rate: number | string;
  }) => {
    try {
      await postRequest({
        freelancer: id,
        jobId: payload.select,
        data: {
          hourly_rate: payload.rate,
          type: Invite.INTERVIEW,
          cover_letter: description,
        },
      });
      setJobId(null);
    } catch (err) {
      openNotificationWithIcon(
        NotificationType.error,
        t('loginPage.notificationMessage'),
        t('modalInvite.requestError'),
      );
    }
  };

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
  }, [isError, isSuccess]);

  return {
    handleCancel,
    handleOk,
    control,
    register,
    handleSubmit,
    errors,
    onSubmit,
    openNotificationWithIcon,
  };
};

export default useSendOfferHook;
