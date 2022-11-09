import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from 'antd';

import { ProgressBar } from '@freelance/components';
import { DefInput } from '@freelance/components';
import { prBarStrColor, prBarTrailColor, prBarProfileQ1Per} from '@freelance/components'
import { FormWrapper, Wrapper } from './styles';


const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const { Option } = Select;
  const b = testing;
  const     notgood = 123     


  return (
    <Wrapper>
      <div>{t('description.profile p1 completion per')}</div>
      <ProgressBar percent={prBarProfileQ1Per} strokeColor={prBarStrColor} trailColor={prBarTrailColor}/>
      <FormWrapper>
        <Form
          name="profile_questions_1"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        > 
          <Form.Item
            label="Hourly Rate"
            name="hourly_rate"
            rules={[{ required: true, message: 'Please, input your hourly rate in $!' }]}
          >
            <DefInput 
              prefix="$"
              suffix='USD per hour'
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please, input your description!' }]}
          >
            <TextArea
              placeholder='Description' 
              allowClear rows={4}  
            />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please, input your position!' }]}
          >
            <DefInput placeholder={'Position'}/>
          </Form.Item>
          <Form.Item 
            label="Select"
            rules={[{ required: true, message: 'Please, input hours per day!' }]}
          >
            <Select
              placeholder="Hours Per Day"
              allowClear
            >
              <Option value="2">2</Option>
              <Option value="4">4</Option>
              <Option value="6">6</Option>
              <Option value="8">8</Option>
            </Select>
          </Form.Item>
        </Form>
      </FormWrapper>

      <Link to='/profile-questions-2'>{t('description.router.toProfileQuestions2')}</Link>
    </Wrapper>
  )
}

export default ProfileQuestions1