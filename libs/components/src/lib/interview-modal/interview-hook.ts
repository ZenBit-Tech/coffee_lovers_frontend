import { NotificationType } from '@freelance/constants';

import { sendInviteHookDto, sendInviteHookReturnDto } from './types';

const useInterviewModalHook = ({
  api,
  setConfirmLoading,
  setOpen,
}: sendInviteHookDto): sendInviteHookReturnDto => {
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

export default useInterviewModalHook;
