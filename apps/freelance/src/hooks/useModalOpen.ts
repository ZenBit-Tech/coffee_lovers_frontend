import { ModalHookReturn, ModalProps } from './types/modal-hook.types';

const UseModalOpenHook = ({
  setConfirmLoading,
  setOpen,
}: ModalProps): ModalHookReturn => {
  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return { handleCancel, handleOk };
};

export default UseModalOpenHook;
