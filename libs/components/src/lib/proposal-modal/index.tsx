import { useEffect } from 'react';
import { Form, Modal, ModalProps } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  jobDataTestId,
  modal,
  modalWidth,
  NotificationType,
  StyledButton,
} from '@freelance/components';
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
  openNotificationWithIcon,
  ...props
}: {
  openModal: boolean;
  rate?: number;
  freelancer_rate?: number;
  id: number;
  onCancel: () => void;
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
} & ModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { handleSubmit } = useForm<IProposal>();
  const [
    sendProposal,
    { isSuccess: sendProposalSuccess, isError: sendProposalError },
  ] = useSendProposalMutation();

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
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
    }
  };

  useEffect(() => {
    sendProposalSuccess &&
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        t('proposalModal.success'),
        t('proposalModal.successMessage'),
      );
    sendProposalError &&
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
  }, [sendProposalSuccess, sendProposalError]);

  return (
    <div data-testid={jobDataTestId.jobProposalModal}>
      <Modal
        {...props}
        open={openModal}
        onCancel={onCancel}
        centered
        width={modalWidth}
        footer={null}
      >
        <StyledForm
          name="basic"
          fields={[
            {
              name: modal.hourRate,
              value: rate,
            },
          ]}
          requiredMark="optional"
          onFinish={values => handleSubmit(onFinish(values as IProposal))}
        >
          <StyledText>
            <p>{t('hourlyRate.profileRate')}</p>
            <p data-testid={jobDataTestId.jobFreelancerRate}>
              {freelancer_rate} $
            </p>
          </StyledText>

          <RateWrapper
            label={t('hourlyRate.setupRate')}
            name={modal.hourRate}
            rules={[
              {
                required: true,
                message: `${t('hourlyRate.rateErrorMessage')}`,
              },
            ]}
          >
            <StyledNumInput
              data-testid={jobDataTestId.jobNumberInput}
              prefix={t('hourlyRate.ratePrefix')}
              addonAfter={t('hourlyRate.rateSuffix')}
              min={modal.min}
            />
          </RateWrapper>

          <StyledText>{t('proposalModal.coverLetter')}</StyledText>

          <Form.Item
            name={modal.description}
            rules={[
              {
                required: true,
                message: `${t('proposalModal.coverLetterErrorMessage')}`,
              },
            ]}
          >
            <StyledTextArea
              data-testid={jobDataTestId.jobTextArea}
              rows={6}
              placeholder={t('proposalModal.coverLetterText')}
            />
          </Form.Item>

          <StyledButton theme={baseTheme} htmlType="submit" type="primary">
            {t('proposalModal.sendProposal')}
          </StyledButton>
        </StyledForm>
      </Modal>
    </div>
  );
};
