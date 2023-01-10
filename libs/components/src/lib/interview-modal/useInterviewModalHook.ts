import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NotificationType } from '@freelance/components';
import { usePostRequestMutation } from 'src/redux/services/requestApi';
import { RequestType } from 'src/redux/types/request.types';

import { sendInviteHookDto, sendInviteHookReturnDto } from './types';

const useInterviewModalHook = ({
  api,
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
          type: RequestType.INTERVIEW,
          cover_letter: description,
        },
      });
      setJobId(null);
    } catch (err) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('loginPage.notificationMessage'),
        t('modalInvite.requestError'),
      );
    }
  };

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('loginPage.notificationMessage'),
        t('modalInvite.offerError'),
      );
    }
    if (isSuccess) {
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        t('modalInvite.requestSuccessHeader'),
        t('modalInvite.offerSuccess'),
      );
      reset({ select: null, rate: hourly_rate });
    }
  }, [isError, isSuccess]);

  return {
    openNotificationWithIcon,
    control,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useInterviewModalHook;
