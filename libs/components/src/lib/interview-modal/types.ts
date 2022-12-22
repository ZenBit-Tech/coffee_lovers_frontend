import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { NotificationType } from '@freelance/constants';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { NotificationInstance } from 'antd/es/notification/interface';
import { Job } from 'src/redux/types/jobs.types';

export interface Props {
  open: boolean;
  setOpen: (op: boolean) => void;
  description?: string;
  hourly_rate?: number;
  id?: number;
}

export interface Conversation {
  id: number;
  job: Job;
}

export interface sendInviteHookDto {
  api: NotificationInstance;
  setConfirmLoading: Dispatch<SetStateAction<boolean>>;
  setOpen: (op: boolean) => void;
  hourly_rate?: number;
  isSuccess: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export interface sendInviteHookReturnDto {
  handleSubmit: UseFormHandleSubmit<{
    select: null;
    rate: number | undefined;
  }>;
  handleCancel: () => void;
  handleOk: () => void;

  control: Control<{ select: null; rate: number | undefined }, unknown>;
  register: UseFormRegister<{
    select: null;
    rate: number | undefined;
  }>;
  errors: Partial<
    FieldErrorsImpl<{
      select: number;
      rate: number;
    }>
  >;
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
}
