import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Form, FormInstance } from 'antd';
import { SubmitHandler, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotificationType, useOpenNotification } from '@freelance/components';
import {
  useAddUserEduInfoMutation,
  useAddUserWorkhistoryInfoMutation,
  useUpdateUserInfoMutation,
} from 'src/redux/services/user';

import { onFinishLogic } from './hooks';
import { IProfileQuestions } from './model';

interface IUseFreelacerProfileForm {
  handleSubmit: UseFormHandleSubmit<IProfileQuestions>;
  contextHolder?: ReactElement<string>;
  onFinish: (values: IProfileQuestions) => SubmitHandler<IProfileQuestions>;
  form?: FormInstance<unknown>;
  setIsFormChanged: Dispatch<SetStateAction<boolean>>;
}

export const useFreelacerProfileForm = (
  navigation?: string,
): IUseFreelacerProfileForm => {
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.returnValue = '';
    };
    if (isFormChanged) {
      window.addEventListener('beforeunload', handler);
    }

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [isFormChanged]);

  const { t } = useTranslation();
  const { handleSubmit } = useForm<IProfileQuestions>();
  const [form] = Form.useForm();
  const [UpdateUserInfo] = useUpdateUserInfoMutation();
  const [AddUserEduInfo] = useAddUserEduInfoMutation();
  const [AddUserWorkhistory] = useAddUserWorkhistoryInfoMutation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const navigate = useNavigate();

  const onFinish: SubmitHandler<IProfileQuestions> = async values => {
    const [educationPayloadArr, userPayload, workPayloadArr] =
      onFinishLogic(values);

    try {
      await UpdateUserInfo(userPayload);
      await AddUserEduInfo(educationPayloadArr());
      await AddUserWorkhistory(workPayloadArr());
      form.resetFields();
      setIsFormChanged(false);
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        t('description.profileQp1.notifSuccess'),
        t('description.profileQp1.notifSuccessMsg'),
      );
      navigation && navigate(navigation);
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
    }
  };

  return { handleSubmit, contextHolder, onFinish, form, setIsFormChanged };
};
