import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NotificationType } from '@freelance/components';
import { dateType, todayDate } from '@freelance/constants';
import { usePostOfferMutation } from 'src/redux/services/requestApi';

import { sendOfferHookDto, sendOfferHookReturnDto } from './types';

const useSendOfferHook = ({
  api,
  hourly_rate,
  id,
  description,
}: sendOfferHookDto): sendOfferHookReturnDto => {
  const { t } = useTranslation();
  const [postOffer, { isError, isSuccess }] = usePostOfferMutation();
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
      start: dayjs(todayDate, dateType),
    },
  });

  const onSubmit = async (payload: {
    select?: number | null;
    rate: number | string;
    start?: Dayjs | null;
  }) => {
    try {
      const { select, rate, start } = payload;
      await postOffer({
        freelancer: id,
        jobId: select,
        data: {
          hourly_rate: rate,
          start,
          cover_letter: description,
        },
      });
    } catch (err) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('loginPage.notificationMessage'),
        t('modalInvite.offerError'),
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
    control,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useSendOfferHook;
