import dayjs, { Dayjs } from 'dayjs';
import {
  Control,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { NotificationType } from '@freelance/constants';

export interface Props {
  hourly_rate?: number;
  id?: number;
  description?: string;
  open: boolean;
  setOpen: (op: boolean) => void;
}

export interface FreelancerId {
  id: number;
}

export interface sendOfferHookReturnDto {
  handleCancel: () => void;
  handleOk: () => void;

  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;

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
