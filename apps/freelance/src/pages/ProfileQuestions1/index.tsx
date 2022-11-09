import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DatePicker, Form, Input, Select } from 'antd';

import {
  profileQ1AvTime,
  profileQ1Descr,
  profileQ1Edu,
  profileQ1EduForm,
  profileQ1EduInfo,
  profileQ1EduTo,
  profileQ1Form,
  profileQ1HR,
  profileQ1Pos,
  profileQ1WorkFrom,
  profileQ1WorkHistory,
  profileQ1WorkHistoryWrapper,
  profileQ1WorkTo,
  ProgressBar,
} from '@freelance/components';
import { DefInput } from '@freelance/components';
import {
  prBarStrColor,
  prBarTrailColor,
  prBarProfileQ1Per,
} from '@freelance/components';
import {
  Wrapper,
  StTextArea,
  StFormItemDateFrom,
  StFormItemDateTo,
  StTextAreaWork,
  StDatePickerWork,
} from './styles';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      sm: { span: 2 },
    },
    wrapperCol: {
      sm: { span: 6 },
    },
  };

  return (
    <Wrapper>
      <div>{t('description.profileQp1.pr_bar_completion_per')}</div>
      <ProgressBar
        percent={prBarProfileQ1Per}
        strokeColor={prBarStrColor}
        trailColor={prBarTrailColor}
      />
      <Form
        name={profileQ1Form}
        {...formItemLayout}
        initialValues={{ remember: true }}
        autoComplete="off"
        labelAlign="left"
        requiredMark="optional"
      >
        <Form.Item
          label={t('description.profileQp1.hR')}
          name={profileQ1HR}
          rules={[
            { required: true, message: 'Please, input your hourly rate in $!' },
          ]}
        >
          <DefInput prefix="$" suffix="USD per hour" />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.descr')}
          name={profileQ1Descr}
          rules={[
            { required: true, message: 'Please, input your description!' },
          ]}
          wrapperCol={{
            sm: { span: 16, offset: 0 },
          }}
        >
          <StTextArea
            placeholder={t('description.profileQp1.Descr')}
            allowClear
            rows={4}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.pos')}
          name={profileQ1Pos}
          rules={[{ required: true, message: 'Please, input your position!' }]}
        >
          <DefInput placeholder={t('description.profileQp1.pos')} />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.avTime')}
          name={profileQ1AvTime}
          rules={[{ required: true, message: 'Please, input hours per day!' }]}
        >
          <Select placeholder={t('description.profileQp1.hPD')} allowClear>
            <Option value="Part-Time">Part-Time</Option>
            <Option value="Full-Time">Full-Time</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.edu')}
          rules={[{ required: true, message: 'Education is required' }]}
          name={profileQ1Edu}
          wrapperCol={{
            sm: { span: 24, offset: 0 },
          }}
        >
          <Input.Group compact>
            <Form.Item
              name={profileQ1EduInfo}
              rules={[
                { required: true, message: 'Education field is required' },
              ]}
            >
              <DefInput placeholder={t('description.profileQp1.infoEdu')} />
            </Form.Item>
            <StFormItemDateFrom
              name={profileQ1EduForm}
              rules={[{ required: true, message: 'Field is required' }]}
            >
              <DatePicker picker="year" />
            </StFormItemDateFrom>
            <StFormItemDateTo
              name={profileQ1EduTo}
              rules={[{ required: true, message: 'Field is required' }]}
            >
              <DatePicker picker="year" />
            </StFormItemDateTo>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Work history"
          name={profileQ1WorkHistoryWrapper}
          rules={[{ required: true, message: 'Work history is required' }]}
          wrapperCol={{
            sm: { span: 24, offset: 0 },
          }}
        >
          <Form.Item
            name={profileQ1WorkHistory}
            rules={[
              { required: true, message: 'Work history field is required' },
            ]}
            noStyle
            wrapperCol={{
              sm: { span: 26, offset: 0 },
            }}
          >
            <StTextAreaWork
              placeholder={t('description.profileQp1.infoWork')}
            />
          </Form.Item>
          <StFormItemDateTo
            name={profileQ1WorkFrom}
            rules={[{ required: true, message: 'Field is required' }]}
            noStyle
          >
            <StDatePickerWork picker="year" />
          </StFormItemDateTo>
          <StFormItemDateTo
            name={profileQ1WorkTo}
            rules={[{ required: true, message: 'Field is required' }]}
            noStyle
          >
            <StDatePickerWork picker="year" />
          </StFormItemDateTo>
        </Form.Item>
      </Form>

      <Link to="/profile-questions-2">
        {t('description.router.toProfileQuestions2')}
      </Link>
    </Wrapper>
  );
};

export default ProfileQuestions1;
