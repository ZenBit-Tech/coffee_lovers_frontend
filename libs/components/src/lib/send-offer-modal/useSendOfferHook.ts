import { NotificationType } from '@freelance/constants';

import { sendOfferHookDto, sendOfferHookReturnDto } from './types';

const useSendOfferHook = ({
  api,
  setConfirmLoading,
  setOpen,
}: sendOfferHookDto): sendOfferHookReturnDto => {
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

  return {
    handleCancel,
    handleOk,
    openNotificationWithIcon,
  };
};

export default useSendOfferHook;
