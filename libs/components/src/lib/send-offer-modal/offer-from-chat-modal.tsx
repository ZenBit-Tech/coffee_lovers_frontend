import { useEffect } from 'react';
import { DatePicker, Form, Modal, ModalProps } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NotificationType, StyledButton } from '@freelance/components';
import { modalWidth, profileQ1 } from '@freelance/constants';
import { usePostOfferMutation } from 'src/redux/invite/inviteApi';
import { Request } from 'src/redux/invite/types';
import { ICurrentConversationInfo } from 'src/redux/types/chat.types';
import { formatDate } from 'src/utils/dates';

import { StyledDescr, StyledNumberInput, StyledTitle } from './styles';

interface ISendOffer {
  rate: number;
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

  const [postOffer, { isSuccess }] = usePostOfferMutation();
  const { handleSubmit } = useForm({
    defaultValues: {
      rate: currentConversationInfo.jobRate,
      date: '',
    },
  });

  const onFinish: SubmitHandler<ISendOffer> = async values => {
    try {
      const offerResponse = {
        data: {
          status: Request.pending,
          hourly_rate: values.rate,
          start: formatDate(new Date(values.date)),
        },
        freelancer: currentConversationInfo.freelancerId,
        jobId: currentConversationInfo.jobId,
      };
      await postOffer(offerResponse);
      form.resetFields();
      onCancel();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        `${t('offers.receive.success')}`,
        `${t('offers.receive.successMessage')}`,
      );
    }
  }, [isSuccess]);

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
        requiredMark="optional"
        onFinish={values => handleSubmit(onFinish(values as ISendOffer))}
      >
        <StyledTitle>{currentConversationInfo.jobTitle}</StyledTitle>

        <Form.Item
          label={t('job_details.start_date')}
          name="date"
          rules={[
            { required: true, message: `${t('description.profileQp1.mesHR')}` },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={t('job_details.setup_rate')}
          name="rate"
          rules={[
            { required: true, message: `${t('description.profileQp1.mesHR')}` },
          ]}
        >
          <StyledNumberInput
            defaultValue={currentConversationInfo.jobRate}
            prefix={t('description.profileQp1.hRPrefix')}
            addonAfter={t('description.profileQp1.hRSuffix')}
            min={profileQ1.hRMin}
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
