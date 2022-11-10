import { useTranslation } from 'react-i18next';
import { DatePicker, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import {
  profileQ1,
  ProgressBar,
  prBarStrColor,
  prBarTrailColor,
} from '@freelance/components';
import { DefInput } from '@freelance/components';
import {
  Wrapper,
  StTextArea,
  StFormItemDateFrom,
  StFormItemDateTo,
  StTextAreaWork,
  StDatePickerWork,
  StForm,
  StUserIcon,
  StUserAvatarWrapper,
  StUserUpBtn,
  StSubButton,
  StInputNumber,
} from './styles';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      sm: { span: 2 },
    },
    wrapperCol: {
      sm: { span: 4 },
    },
  };

  return (
    <Wrapper>
      <div>{t('description.profileQp1.pr_bar_completion_per')}</div>
      <ProgressBar
        percent={profileQ1.prBarProfileQ1Per}
        strokeColor={prBarStrColor}
        trailColor={prBarTrailColor}
      />
      <StUserAvatarWrapper>
        <StUserIcon />
        <Upload>
          <StUserUpBtn icon={<UploadOutlined />}>
            Upload Profile Photo
          </StUserUpBtn>
        </Upload>
      </StUserAvatarWrapper>
      <StForm
        name={profileQ1.profileQ1Form}
        {...formItemLayout}
        initialValues={{ remember: true }}
        autoComplete="on"
        labelAlign="left"
        requiredMark="optional"
      >
        <Form.Item
          label={t('description.profileQp1.hR')}
          name={profileQ1.profileQ1HR}
          rules={[
            { required: true, message: 'Please, input your hourly rate in $!' },
          ]}
        >
          <StInputNumber
            prefix={t('description.profileQp1.hRPrefix')}
            addonAfter={t('description.profileQp1.hRSuffix')}
            min={profileQ1.profileQ1HRMin}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.descr')}
          name={profileQ1.profileQ1Descr}
          rules={[
            { required: true, message: 'Please, input your description!' },
          ]}
          wrapperCol={{
            sm: { span: 12, offset: 0 },
          }}
        >
          <StTextArea
            placeholder={t('description.profileQp1.descr')}
            allowClear
            rows={4}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.pos')}
          name={profileQ1.profileQ1Pos}
          rules={[{ required: true, message: 'Please, input your position!' }]}
        >
          <DefInput placeholder={t('description.profileQp1.pos')} />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.avTime')}
          name={profileQ1.profileQ1AvTime}
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
          name={profileQ1.profileQ1Edu}
          wrapperCol={{
            sm: { span: 24, offset: 0 },
          }}
        >
          <Input.Group compact>
            <Form.Item
              name={profileQ1.profileQ1EduInfo}
              rules={[
                { required: true, message: 'Education field is required' },
              ]}
            >
              <DefInput placeholder={t('description.profileQp1.infoEdu')} />
            </Form.Item>
            <StFormItemDateFrom
              name={profileQ1.profileQ1EduForm}
              rules={[{ required: true, message: 'Field is required' }]}
            >
              <DatePicker
                placeholder={t('description.profileQp1.from')}
                picker="year"
              />
            </StFormItemDateFrom>
            <StFormItemDateTo
              name={profileQ1.profileQ1EduTo}
              rules={[{ required: true, message: 'Field is required' }]}
            >
              <DatePicker
                placeholder={t('description.profileQp1.to')}
                picker="year"
              />
            </StFormItemDateTo>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Work history"
          name={profileQ1.profileQ1WorkHistoryWrapper}
          rules={[{ required: true, message: 'Work history is required' }]}
          wrapperCol={{
            sm: { span: 24, offset: 0 },
          }}
        >
          <Form.Item
            name={profileQ1.profileQ1WorkHistory}
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
            name={profileQ1.profileQ1WorkFrom}
            rules={[{ required: true, message: 'Field is required' }]}
            noStyle
          >
            <StDatePickerWork
              placeholder={t('description.profileQp1.from')}
              picker="year"
            />
          </StFormItemDateTo>
          <StFormItemDateTo
            name={profileQ1.profileQ1WorkTo}
            rules={[{ required: true, message: 'Field is required' }]}
            noStyle
          >
            <StDatePickerWork
              placeholder={t('description.profileQp1.to')}
              picker="year"
            />
          </StFormItemDateTo>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            sm: { span: 20, offset: 2 },
            lg: { span: 3, offset: 15 },
          }}
        >
          <StSubButton
            href="/profile-questions-2"
            size="large"
            type="primary"
            htmlType="submit"
          >
            {t('description.router.toProfileQuestions2')}
          </StSubButton>
        </Form.Item>
      </StForm>
    </Wrapper>
  );
};

export default ProfileQuestions1;
