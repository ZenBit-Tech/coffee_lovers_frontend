import { DatePicker, Form, InputNumber, Modal, ModalProps } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@freelance/components';
import { profileQ1 } from '@freelance/constants';
import { ICurrentConversationInfo } from 'src/redux/types/chat.types';

interface ISendOffer {
  rate: number;
  date: string;
}

export const OfferFromChatModal = ({
  openModal,
  currentConversationInfo,
  onCancel,
  ...props
}: {
  openModal: boolean;
  currentConversationInfo: ICurrentConversationInfo;
  onCancel: () => void;
} & ModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleSubmit } = useForm({
    defaultValues: {
      rate: currentConversationInfo.jobRate,
      date: '',
    },
  });

  const onFinish: SubmitHandler<ISendOffer> = async values => {
    try {
      const offerResponse = {
        rate: values.rate,
        date: values.date,
      };
      await alert(JSON.stringify(offerResponse));
      form.resetFields();
      onCancel();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal
      {...props}
      open={openModal}
      onCancel={onCancel}
      centered
      width={800}
      footer={null}
    >
      <Form
        name="basic"
        requiredMark="optional"
        onFinish={values => handleSubmit(onFinish(values as ISendOffer))}
      >
        <h2>{currentConversationInfo.jobTitle}</h2>

        <Form.Item
          label={t('job_details.setup_rate')}
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
          <InputNumber
            defaultValue={currentConversationInfo.jobRate}
            prefix={t('description.profileQp1.hRPrefix')}
            addonAfter={t('description.profileQp1.hRSuffix')}
            min={profileQ1.hRMin}
          />
        </Form.Item>

        <p>{currentConversationInfo.jobDescription}</p>

        <StyledButton htmlType="submit" type="primary">
          {t('chat.sendOffer')}
        </StyledButton>
      </Form>
    </Modal>
  );
};
