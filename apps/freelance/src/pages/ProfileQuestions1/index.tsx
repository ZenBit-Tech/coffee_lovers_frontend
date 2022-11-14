import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import {
  DefInput,
  prBarStrColor,
  prBarTrailColor,
  profileQ1,
  ProgressBar,
} from '@freelance/components';
import { DatePicker, Form, Input, Select, Upload } from 'antd';
import { useAddprofileQuestions1DataMutation } from 'redux/profileQuestions/profileQuestions1Api';

import { onFinishLogic } from './hooks';
import { IProfileQuestions1 } from './model';
import * as St from './styles';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<IProfileQuestions1>();
  const [form] = Form.useForm();
  const [AddprofileQuestions1Data] = useAddprofileQuestions1DataMutation();

  const { Option } = Select;
  const onFinish: SubmitHandler<IProfileQuestions1> = async values => {
    try {
      await AddprofileQuestions1Data(onFinishLogic(values));
      form.resetFields();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <St.Wrapper>
      <div>{t('description.profileQp1.pr_bar_completion_per')}</div>
      <ProgressBar
        percent={profileQ1.prBarProfileQ1Per}
        strokeColor={prBarStrColor}
        trailColor={prBarTrailColor}
      />
      <St.StUserAvatarWrapper>
        <St.StUserIcon />
        <Upload>
          <St.StUserUpBtn icon={<UploadOutlined />}>
            Upload Profile Photo
          </St.StUserUpBtn>
        </Upload>
      </St.StUserAvatarWrapper>
      <St.StForm
        name={profileQ1.profileQ1Form}
        {...profileQ1.formItemLayout}
        initialValues={{ remember: true }}
        autoComplete="on"
        form={form}
        labelAlign="left"
        requiredMark="optional"
        onFinish={values =>
          handleSubmit(onFinish(values as IProfileQuestions1))
        }
      >
        <Form.Item
          label={t('description.profileQp1.hR')}
          name={profileQ1.profileQ1HR}
          rules={[
            { required: true, message: `${t('description.profileQp1.mesHR')}` },
          ]}
        >
          <St.StInputNumber
            prefix={t('description.profileQp1.hRPrefix')}
            addonAfter={t('description.profileQp1.hRSuffix')}
            min={profileQ1.profileQ1HRMin}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.descr')}
          name={profileQ1.profileQ1Descr}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp1.mesDescr')}`,
            },
          ]}
          wrapperCol={{
            sm: { span: 12, offset: 0 },
          }}
        >
          <St.StTextArea
            placeholder={t('description.profileQp1.descr')}
            allowClear
            rows={4}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.pos')}
          name={profileQ1.profileQ1Pos}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp1.mesPos')}`,
            },
          ]}
        >
          <DefInput placeholder={t('description.profileQp1.pos')} />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.avTime')}
          name={profileQ1.profileQ1AvTime}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp1.mesAvTime')}`,
            },
          ]}
        >
          <Select placeholder={t('description.profileQp1.hPD')} allowClear>
            <Option value="Part-Time">Part-Time</Option>
            <Option value="Full-Time">Full-Time</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.edu')}
          wrapperCol={{
            sm: { span: 24, offset: 0 },
          }}
        >
          <Input.Group compact>
            <Form.Item
              name={[profileQ1.profileQ1Edu, profileQ1.profileQ1EduInfo]}
              rules={[
                {
                  required: true,
                  message: `${t('description.profileQp1.mesEdu')}`,
                },
              ]}
            >
              <DefInput placeholder={t('description.profileQp1.infoEdu')} />
            </Form.Item>
            <St.StFormItemDateFrom
              name={[profileQ1.profileQ1Edu, profileQ1.profileQ1EduForm]}
              rules={[
                {
                  required: true,
                  message: `${t('description.profileQp1.mesEduTimeFrom')}`,
                },
              ]}
            >
              <DatePicker
                placeholder={t('description.profileQp1.from')}
                picker="year"
              />
            </St.StFormItemDateFrom>
            <St.StFormItemDateTo
              name={[profileQ1.profileQ1Edu, profileQ1.profileQ1EduTo]}
              rules={[
                {
                  required: true,
                  message: `${t('description.profileQp1.mesEduTimeTo')}`,
                },
              ]}
            >
              <DatePicker
                placeholder={t('description.profileQp1.to')}
                picker="year"
              />
            </St.StFormItemDateTo>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Work history"
          wrapperCol={{
            sm: { span: 24, offset: 0 },
          }}
        >
          <Form.Item
            name={[
              profileQ1.profileQ1WorkHistoryWrapper,
              profileQ1.profileQ1WorkHistory,
            ]}
            rules={[
              {
                required: true,
                message: `${t('description.profileQp1.mesWork')}`,
              },
            ]}
            noStyle
            wrapperCol={{
              sm: { span: 26, offset: 0 },
            }}
          >
            <St.StTextAreaWork
              placeholder={t('description.profileQp1.infoWork')}
            />
          </Form.Item>
          <St.StFormItemDateTo
            name={[
              profileQ1.profileQ1WorkHistoryWrapper,
              profileQ1.profileQ1WorkFrom,
            ]}
            rules={[
              {
                required: true,
                message: `${t('description.profileQp1.mesWorkTimeFrom')}`,
              },
            ]}
            noStyle
          >
            <St.StDatePickerWork
              placeholder={t('description.profileQp1.from')}
              picker="year"
            />
          </St.StFormItemDateTo>
          <St.StFormItemDateTo
            name={[
              profileQ1.profileQ1WorkHistoryWrapper,
              profileQ1.profileQ1WorkTo,
            ]}
            rules={[
              {
                required: true,
                message: `${t('description.profileQp1.mesWorkTimeTo')}`,
              },
            ]}
            noStyle
          >
            <St.StDatePickerWork
              placeholder={t('description.profileQp1.to')}
              picker="year"
            />
          </St.StFormItemDateTo>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            sm: { span: 20, offset: 2 },
            lg: { span: 3, offset: 15 },
          }}
        >
          <St.StSubButton size="large" type="primary" htmlType="submit">
            {t('description.router.toProfileQuestions2')}
          </St.StSubButton>
        </Form.Item>
      </St.StForm>
    </St.Wrapper>
  );
};

export default ProfileQuestions1;
