import { Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Control,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { NotificationInstance } from 'antd/es/notification/interface';

export interface Props {
  hourly_rate?: number;
  id?: number;
  description?: string;
  open: boolean;
  setOpen: (op: boolean) => void;
}

export interface sendOfferHookDto {
  api: NotificationInstance;
  hourly_rate?: number;
  id?: number;
  description?: string;
  setJobId: Dispatch<SetStateAction<number | null>>;
}

export interface FreelancerId {
  id: number;
}

export interface sendOfferHookReturnDto {
  control: Control<{
    select: null;
    rate: string | number;
    start: dayjs.Dayjs;
  }>;

  register: UseFormRegister<{
    select: null;
    rate: string | number;
    start: dayjs.Dayjs;
  }>;

  handleSubmit: UseFormHandleSubmit<{
    select: null;
    rate: string | number;
    start: dayjs.Dayjs;
  }>;

  errors: Partial<
    FieldErrorsImpl<{
      select: never;
      rate: NonNullable<string | number>;
      start: object;
    }>
  >;
  onSubmit: (payload: {
    select: number | null;
    rate: number | string;
    start?: Dayjs | null;
  }) => Promise<void>;
}
