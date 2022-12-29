import { Dispatch, SetStateAction } from 'react';

export interface ModalProps {
  setConfirmLoading: Dispatch<SetStateAction<boolean>>;
  setOpen: (op: boolean) => void;
}

export interface ModalHookReturn {
  handleCancel: () => void;
  handleOk: () => void;
}
