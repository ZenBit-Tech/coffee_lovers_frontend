import { Form, Modal, ModalProps } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { jobDataTestId, profileQ1, StyledButton } from '@freelance/components';
import { useSendProposalMutation } from 'src/redux/services/jobsApi';
import { baseTheme } from 'src/styles/theme';

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
  rate,
  freelancer_rate,
  id,
  onCancel,
  ...props
}: {
  openModal: boolean;
  rate?: number;
  freelancer_rate?: number;
  id: number;
  onCancel: () => void;
} & ModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleSubmit } = useForm<IProposal>();
  const [sendProposal] = useSendProposalMutation();

  const onFinish: SubmitHandler<IProposal> = async values => {
    try {
      const proposalResponse = {
        job: id,
        hourly_rate: values.hourly_rate,
        cover_letter: values.description,
      };
      await sendProposal(proposalResponse);
      form.resetFields();
      onCancel();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div data-testid={jobDataTestId.jobProposalModal}>
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
            <p>{t('job_details.Profile_rate')}</p>
            <p data-testid={jobDataTestId.jobFreelancerRate}>
              {freelancer_rate} $
            </p>
          </StyledText>

          <RateWrapper
            label={t('job_details.setup_rate')}
            name={profileQ1.hR}
            rules={[
              {
                required: true,
                message: `${t('description.profileQp1.mesHR')}`,
              },
            ]}
          >
            <StyledNumInput
              data-testid={jobDataTestId.jobNumberInput}
              defaultValue={rate}
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
              data-testid={jobDataTestId.jobTextArea}
              rows={6}
              placeholder={t('description.profileQp1.descr')}
            />
          </Form.Item>

          <StyledButton theme={baseTheme} htmlType="submit" type="primary">
            {t('job_details.send_proposal')}
          </StyledButton>
        </StyledForm>
      </Modal>
    </div>
  );
};
