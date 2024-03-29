import { useEffect } from 'react';
import { DatePicker, Form, Modal, ModalProps } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NotificationType, StyledButton } from '@freelance/components';
import { modal, modalWidth } from '@freelance/constants';
import { usePostOfferMutation } from 'src/redux/services/requestApi';
import { ICurrentConversationInfo } from 'src/redux/types/chat.types';
import { formatDate } from 'src/utils/dates';

import { StyledDescr, StyledNumberInput, StyledTitle } from './styles';

interface ISendOffer {
  hourly_rate: number;
  date: string;
}

export const OfferFromChatModal = ({
  openModal,
  currentConversationInfo,
  onCancel,
  openNotificationWithIcon,
  ...props
}: {
  openModal: boolean;
  currentConversationInfo: ICurrentConversationInfo;
  onCancel: () => void;
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
} & ModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [postOffer, { isSuccess: sendOfferSuccess, isError: sendOfferError }] =
    usePostOfferMutation();
  const { handleSubmit } = useForm({
    defaultValues: {
      hourly_rate: currentConversationInfo.jobRate,
      date: '',
    },
  });

  const onFinish: SubmitHandler<ISendOffer> = async values => {
    try {
      const offerResponse = {
        data: {
          hourly_rate: values.hourly_rate,
          start: formatDate(new Date(values.date)),
        },
        freelancer: currentConversationInfo.freelancerId,
        jobId: currentConversationInfo.jobId,
      };
      await postOffer(offerResponse);
      form.resetFields();
      onCancel();
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
    }
  };

  useEffect(() => {
    sendOfferSuccess &&
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        t('offers.receive.success'),
        t('offers.receive.successMessage'),
      );

    sendOfferError &&
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
  }, [sendOfferSuccess, sendOfferError]);

  return (
    <Modal
      {...props}
      open={openModal}
      onCancel={onCancel}
      centered
      width={modalWidth}
      footer={null}
    >
      <Form
        name="basic"
        fields={[
          {
            name: modal.hourRate,
            value: currentConversationInfo.jobRate,
          },
        ]}
        requiredMark="optional"
        onFinish={values => handleSubmit(onFinish(values as ISendOffer))}
      >
        <StyledTitle>{currentConversationInfo.jobTitle}</StyledTitle>

        <Form.Item
          label={t('job_details.start_date')}
          name={modal.dateFieldName}
          rules={[
            { required: true, message: `${t('description.profileQp1.mesHR')}` },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={t('hourlyRate.setupRate')}
          name={modal.hourRate}
          rules={[
            { required: true, message: `${t('hourlyRate.rateErrorMessage')}` },
          ]}
        >
          <StyledNumberInput
            prefix={t('hourlyRate.ratePrefix')}
            addonAfter={t('hourlyRate.rateSuffix')}
            min={modal.min}
          />
        </Form.Item>

        <StyledDescr>{currentConversationInfo.jobDescription}</StyledDescr>

        <StyledButton htmlType="submit" type="primary">
          {t('chat.sendOffer')}
        </StyledButton>
      </Form>
    </Modal>
  );
};
