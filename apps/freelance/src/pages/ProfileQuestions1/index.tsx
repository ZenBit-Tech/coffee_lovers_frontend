import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProgressBar } from '@freelance/components';
import { FormWrapper, Wrapper } from './styles';
import { Button, Checkbox, Form, Input } from 'antd';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const progressBarPer = 20;

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Wrapper>
      <div>{t('description.profile p1 completion per')}</div>
      <ProgressBar percent={progressBarPer} strokeColor={'#021691'} trailColor={'#B0C4DE'}/>
      <FormWrapper>
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Form>
      </FormWrapper>

      <Link to='/profile-questions-2'>{t('description.router.toProfileQuestions2')}</Link>
    </Wrapper>
  )
}

export default ProfileQuestions1