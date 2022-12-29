import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NotificationType } from '@freelance/constants';
import { usePostRequestMutation } from 'src/redux/invite/inviteApi';
import { Invite } from 'src/redux/invite/types';

import { sendInviteHookDto, sendInviteHookReturnDto } from './types';

const useInterviewModalHook = ({
  api,
  setConfirmLoading,
  setOpen,
  hourly_rate,
  id,
  description,
  setJobId,
}: sendInviteHookDto): sendInviteHookReturnDto => {
  const { t } = useTranslation();
  const [postRequest, { isError, isSuccess }] = usePostRequestMutation();
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
    openNotificationWithIcon,
    control,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useInterviewModalHook;
