import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { NotificationType } from '@freelance/constants';
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
  hourly_rate?: number;
  id?: number;
  description?: string;
  setJobId: Dispatch<SetStateAction<number | null>>;
}

export interface sendInviteHookReturnDto {
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;

  control: Control<{
    select: null;
    rate: string | number;
  }>;

  register: UseFormRegister<{
    select: null;
    rate: string | number;
  }>;

  handleSubmit: UseFormHandleSubmit<{
    select: null;
    rate: string | number;
  }>;

  errors: Partial<
    FieldErrorsImpl<{
      select: never;
      rate: string | number;
      start: object;
    }>
  >;

  onSubmit: (payload: {
    select: number | null;
    rate: number | string;
  }) => Promise<void>;
}
