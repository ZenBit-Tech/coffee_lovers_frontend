import { Dispatch, SetStateAction } from 'react';
import { NotificationType } from '@freelance/constants';
import { NotificationInstance } from 'antd/es/notification/interface';
import { OffersJobs } from 'src/redux/types/withoutoffer.types.ts';

export interface Props {
  hourly_rate?: number;
  id?: number;
  description?: string;
  open: boolean;
  setOpen: (op: boolean) => void;
  jobsWithoutOfferData?: OffersJobs[];
}

export interface FreelancerId {
  id: number;
}

export interface sendOfferHookDto {
  api: NotificationInstance;
  setConfirmLoading: Dispatch<SetStateAction<boolean>>;
  setOpen: (op: boolean) => void;
}

export interface sendOfferHookReturnDto {
  handleCancel: () => void;
  handleOk: () => void;

  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
}
