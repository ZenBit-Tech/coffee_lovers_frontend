import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProgressBar } from '@freelance/components';
import { FormWrapper, Wrapper } from './styles';
import { Form, Input } from 'antd';
import { DefInput } from '@freelance/components';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const progressBarPer = 20;
  const { TextArea } = Input;

  return (
    <Wrapper>
      <div>{t('description.profile p1 completion per')}</div>
      <ProgressBar percent={progressBarPer} strokeColor={'#021691'} trailColor={'#B0C4DE'}/>
      <FormWrapper>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}

          autoComplete="off"
      > 
        <Form.Item
          label="Hourly Rate"
          name="hourly_rate"
          rules={[{ required: true, message: 'Please input your Hourly Rate!' }]}
        >
          <DefInput placeholder={'$ USD per hour'}/>
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea allowClear rows={4}  />
        </Form.Item>
        </Form>
      </FormWrapper>

      <Link to='/profile-questions-2'>{t('description.router.toProfileQuestions2')}</Link>
    </Wrapper>
  )
}

export default ProfileQuestions1