import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Form } from 'antd';

import { FormWrap, InputsWrapper, InputText, Title } from './styles';
type Inputs = {
  jobOwner: boolean;
  freelancer: boolean;
};

const ChooseRole = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  return (
    <FormWrap>
      <Title>{t('chooseRole.title')}</Title>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item>
          <InputsWrapper>
            <Checkbox type="checkbox">
              <InputText>{t('chooseRole.jobOwner')}</InputText>
            </Checkbox>

            <Checkbox type="checkbox">
              <InputText>{t('chooseRole.freelancer')}</InputText>
            </Checkbox>
          </InputsWrapper>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('resetPassword.buttonText')}
          </Button>
        </Form.Item>
      </Form>
    </FormWrap>
  );
};

export default ChooseRole;
