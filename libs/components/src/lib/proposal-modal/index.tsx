import { Form, Modal, ModalProps } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@freelance/components';
import { profileQ1 } from '@freelance/constants';
import { hourRate, jobRate } from 'src/pages/JobDetailsPage/constants';

import {
  RateWrapper,
  StyledForm,
  StyledNumInput,
  StyledText,
  StyledTextArea,
} from './styles';

interface IProposal {
  hourly_rate: number;
  description: string;
}

export const ProposalModal = ({
  openModal,
  onCancel,
  ...props
}: { openModal: boolean; onCancel: () => void } & ModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleSubmit } = useForm<IProposal>();

  const onFinish: SubmitHandler<IProposal> = async values => {
    try {
      await alert(JSON.stringify(values));
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
      <StyledForm
        name="basic"
        requiredMark="optional"
        onFinish={values => handleSubmit(onFinish(values as IProposal))}
      >
        <StyledText>
          {t('job_details.Profile_rate')} {hourRate} $
        </StyledText>

        <RateWrapper
          label={t('job_details.setup_rate')}
          name={profileQ1.hR}
          rules={[
            { required: true, message: `${t('description.profileQp1.mesHR')}` },
          ]}
        >
          <StyledNumInput
            defaultValue={jobRate}
            prefix={t('description.profileQp1.hRPrefix')}
            addonAfter={t('description.profileQp1.hRSuffix')}
            min={profileQ1.hRMin}
          />
        </RateWrapper>

        <StyledText>{t('job_details.cover_letter')}</StyledText>

        <Form.Item
          name={profileQ1.descr}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp1.mesDescr')}`,
            },
          ]}
        >
          <StyledTextArea
            rows={6}
            placeholder={t('description.profileQp1.descr')}
          />
        </Form.Item>

        <StyledButton htmlType="submit" type="primary">
          {t('job_details.send_proposal')}
        </StyledButton>
      </StyledForm>
    </Modal>
  );
};
