import { Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
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
import { OffersJobs } from 'src/redux/types/withoutoffer.types.ts';

export interface Props {
  hourly_rate?: number;
  id?: number;
  description?: string;
  open: boolean;
  setOpen: (op: boolean) => void;
  // data?: OffersJobs[];
  jobsWithoutOfferData?: OffersJobs[];
}

export interface FreelancerId {
  id: number;
}

export interface sendOfferHookDto {
  api: NotificationInstance;
  setConfirmLoading: Dispatch<SetStateAction<boolean>>;
  setOpen: (op: boolean) => void;
  hourly_rate?: number;
  error?: FetchBaseQueryError | SerializedError;
  isError: boolean;
  isSuccess: boolean;
}

export interface sendOfferHookReturnDto {
  handleSubmit: UseFormHandleSubmit<{
    select: null;
    rate?: number;
    start: dayjs.Dayjs;
  }>;
  handleCancel: () => void;
  handleOk: () => void;

  control: Control<
    { select: null; rate: number | undefined; start: Dayjs },
    unknown
  >;
  register: UseFormRegister<{
    select: null;
    rate: number | undefined;
    start: Dayjs;
  }>;
  errors: Partial<
    FieldErrorsImpl<{
      select: number;
      rate?: number;
      start: object;
    }>
  >;
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
}
