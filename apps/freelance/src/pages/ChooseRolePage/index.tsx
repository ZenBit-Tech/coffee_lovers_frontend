import { useState } from 'react';
import { Button, Checkbox, Form, Space, Typography } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormWrap, InputsWrapper, InputText, Title } from './styles';

type Inputs = {
  jobOwner: boolean;
  freelancer: boolean;
};

const { Text } = Typography;

const ChooseRole = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<Inputs>();
  const [freelancer, setFreelancer] = useState(false);
  const [jobOwner, setJobOwner] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = data => {
    freelancer ? alert('freelancer') : alert('jobOwner');
  };

  const onFreelancerClick = () => {
    if (jobOwner) {
      setJobOwner(false);
      freelancer ? setFreelancer(true) : setFreelancer(false);
    }
    freelancer ? setFreelancer(false) : setFreelancer(true);
  };

  const onJobOwnerClick = () => {
    if (freelancer) {
      jobOwner ? setJobOwner(true) : setJobOwner(false);
      setFreelancer(false);
    }
    jobOwner ? setJobOwner(false) : setJobOwner(true);
  };

  const disabled = !freelancer && !jobOwner;

  return (
    <FormWrap>
      <Title>{t('chooseRole.title')}</Title>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item>
          <InputsWrapper>
            <Checkbox
              type="checkbox"
              checked={jobOwner}
              onChange={onJobOwnerClick}
            >
              <InputText>{t('chooseRole.jobOwner')}</InputText>
            </Checkbox>

            <Checkbox
              type="checkbox"
              checked={freelancer}
              onChange={onFreelancerClick}
            >
              <InputText>{t('chooseRole.freelancer')}</InputText>
            </Checkbox>
          </InputsWrapper>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!freelancer && !jobOwner}
            >
              {t('resetPassword.buttonText')}
            </Button>
            {disabled && (
              <Text type="danger">{t('chooseRole.role_error')}</Text>
            )}
          </Space>
        </Form.Item>
      </Form>
    </FormWrap>
  );
};

export default ChooseRole;
