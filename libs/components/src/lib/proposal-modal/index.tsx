import { Form, Modal, ModalProps } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { profileQ1 } from '@freelance/constants';
import { hourRate, jobRate, skills } from 'src/pages/JobDetailsPage/constants';
import {
  JobSkillsText,
  SkillsWrapper,
  StyledButton,
} from 'src/pages/JobDetailsPage/styles';

import {
  RateWrapper,
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
      <StyledText>{t('job_details.skills')}</StyledText>
      <SkillsWrapper>
        {skills?.map(skill => (
          <JobSkillsText>{skill}</JobSkillsText>
        ))}
      </SkillsWrapper>
      <StyledText>
        {t('job_details.Profile_rate')} {hourRate} $
      </StyledText>

      <Form
        name="basic"
        requiredMark="optional"
        onFinish={values => handleSubmit(onFinish(values as IProposal))}
      >
        <RateWrapper
          label={t('job_details.setup_rate')}
          name={profileQ1.profileQ1HR}
          rules={[
            { required: true, message: `${t('description.profileQp1.mesHR')}` },
          ]}
        >
          <StyledNumInput
            defaultValue={jobRate}
            prefix={t('description.profileQp1.hRPrefix')}
            addonAfter={t('description.profileQp1.hRSuffix')}
            min={profileQ1.profileQ1HRMin}
          />
        </RateWrapper>

        <StyledText>{t('job_details.cover_letter')}</StyledText>

        <Form.Item
          name={profileQ1.profileQ1Descr}
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
      </Form>
    </Modal>
  );
};
