import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import {
  prBarStrColor,
  prBarTrailColor,
  profileQ1,
  ProgressBar,
} from '@freelance/components';
import { DefInput } from '@freelance/components';
import { DatePicker, Form, Input, Select, Upload } from 'antd';
import { useAddprofileQuestions1DataMutation } from 'redux/profileQuestions/profileQuestions1Api';

import { IProfileQuestions1 } from './model';
import {
  StDatePickerWork,
  StForm,
  StFormItemDateFrom,
  StFormItemDateTo,
  StInputNumber,
  StSubButton,
  StTextArea,
  StTextAreaWork,
  StUserAvatarWrapper,
  StUserIcon,
  StUserUpBtn,
  Wrapper,
} from './styles';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<IProfileQuestions1>();
  const [form] = Form.useForm();
  const [AddprofileQuestions1Data] = useAddprofileQuestions1DataMutation();

  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      sm: { span: 2 },
    },
    wrapperCol: {
      sm: { span: 4 },
    },
  };

  const onFinish: SubmitHandler<IProfileQuestions1> = async values => {
    try {
      if (values) {
        const jsonedValues = JSON.parse(JSON.stringify(values));
        const availableTime = jsonedValues.available_time;
        const description = jsonedValues.description;
        const hourlyRate = jsonedValues.hourly_rate;
        const position = jsonedValues.position;
        const educationDescr =
          jsonedValues.education.information_about_education;
        const educationFrom = jsonedValues.education.education_from.substring(
          0,
          4,
        );
        const educationTo = jsonedValues.education.education_to.substring(0, 4);
        const workHistoryDescr = jsonedValues.work_history_wrapper.work_history;
        const workHistoryFrom =
          jsonedValues.work_history_wrapper.work_from.substring(0, 4);
        const workHistoryTo =
          jsonedValues.work_history_wrapper.work_to.substring(0, 4);
        alert(JSON.stringify(values));

        await AddprofileQuestions1Data({
          available_time: availableTime,
          description: description,
          hourly_rate: hourlyRate,
          position: position,
          education_descr: educationDescr,
          education_from: educationFrom,
          education_to: educationTo,
          work_history_descr: workHistoryDescr,
          work_history_from: workHistoryFrom,
          work_history_to: workHistoryTo,
        });
        form.resetFields();
      }
    } catch (error) {
      alert(error);
    }
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
            {
              required: true,
              message: `${t('description.profileQp1.mesDescr')}`,
            },
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
            <StFormItemDateFrom
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
            </StFormItemDateFrom>
            <StFormItemDateTo
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
            </StFormItemDateTo>
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
            <StTextAreaWork
              placeholder={t('description.profileQp1.infoWork')}
            />
          </Form.Item>
          <StFormItemDateTo
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
            <StDatePickerWork
              placeholder={t('description.profileQp1.from')}
              picker="year"
            />
          </StFormItemDateTo>
          <StFormItemDateTo
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
          <StSubButton size="large" type="primary" htmlType="submit">
            {t('description.router.toProfileQuestions2')}
          </StSubButton>
        </Form.Item>
      </StForm>
    </Wrapper>
  );
};

export default ProfileQuestions1;
