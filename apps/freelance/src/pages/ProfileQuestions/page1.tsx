import { Form, Select } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  AvatarUpload,
  DefInput,
  prBarStrColor,
  prBarTrailColor,
  profileQ1,
  ProgressBar,
  routes,
  StyledSelect,
} from '@freelance/components';
import {
  useAddUserEduInfoMutation,
  useAddUserWorkhistoryInfoMutation,
  useUpdateUserInfoMutation,
} from 'redux/profileQuestions/profileQuestions1Api';

import FormEduList from './FormEduList';
import FormWorkList from './FormWorkList';
import { onFinishLogic } from './hooks';
import { IProfileQuestions } from './model';
import * as St from './styles';

export const ProfileQuestions1 = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<IProfileQuestions>();
  const [form] = Form.useForm();
  const [UpdateUserInfo] = useUpdateUserInfoMutation();
  const [AddUserEduInfo] = useAddUserEduInfoMutation();
  const [AddUserWorkhistory] = useAddUserWorkhistoryInfoMutation();
  const navigate = useNavigate();

  const { Option } = Select;
  const onFinish: SubmitHandler<IProfileQuestions> = async values => {
    const [educationPayloadArr, userPayload, workPayloadArr] =
      onFinishLogic(values);
    const workPayload = workPayloadArr();

    try {
      await UpdateUserInfo(userPayload);
      await AddUserEduInfo(educationPayloadArr());
      if (workPayload.length) {
        await AddUserWorkhistory(workPayload);
      }
      form.resetFields();
      navigate(routes.profileQuestions2);
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
        <AvatarUpload />
      </St.StUserAvatarWrapper>

      <St.StForm
        name={profileQ1.form}
        {...profileQ1.formItemLayout}
        initialValues={{ remember: true }}
        autoComplete="on"
        form={form}
        labelAlign="left"
        requiredMark="optional"
        onFinish={values => handleSubmit(onFinish(values as IProfileQuestions))}
      >
        <Form.Item
          label={t('description.profileQp1.hR')}
          name={profileQ1.hR}
          rules={[
            { required: true, message: `${t('description.profileQp1.mesHR')}` },
          ]}
        >
          <St.StInputNumber
            prefix={t('description.profileQp1.hRPrefix')}
            addonAfter={t('description.profileQp1.hRSuffix')}
            min={profileQ1.hRMin}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp1.descr')}
          name={profileQ1.descr}
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
          name={profileQ1.pos}
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
          name={profileQ1.avTime}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp1.mesAvTime')}`,
            },
          ]}
        >
          <StyledSelect
            placeholder={t('description.profileQp1.avTime')}
            allowClear
          >
            <Option value={profileQ1.partTime}>
              {t('description.profileQp1.partTime')}
            </Option>
            <Option value={profileQ1.fullTime}>
              {t('description.profileQp1.fullTime')}
            </Option>
          </StyledSelect>
        </Form.Item>
        <FormEduList />
        <FormWorkList />
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
