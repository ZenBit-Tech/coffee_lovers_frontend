import { Form, Select, Upload } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import {
  prBarStrColor,
  prBarTrailColor,
  profileQ2,
  ProgressBar,
} from '@freelance/components';
import useProperties from '@hooks/useProperties';
import { useUpdateUserInfoMutation } from 'redux/profileQuestions/profileQuestions1Api';

import { IProfileQuestions } from './model';
import * as St from './styles';

export const ProfileQuestions2 = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<IProfileQuestions>();
  const [form] = Form.useForm();
  const [UpdateUserInfo] = useUpdateUserInfoMutation();
  const {
    categories,
    skills,
    englishLevels,
    getOptionsForSelectString,
    getOptionsForSelectWithId,
  } = useProperties();

  const onFinish: SubmitHandler<IProfileQuestions> = async values => {
    try {
      await UpdateUserInfo(values);
      form.resetFields();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <St.Wrapper>
      <div>{t('description.profileQp2.pr_bar_completion_per')}</div>
      <ProgressBar
        percent={profileQ2.prBarProfileQ2Per}
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
        name={profileQ2.form}
        {...profileQ2.formItemLayout}
        initialValues={{ remember: true }}
        autoComplete="on"
        form={form}
        labelAlign="left"
        requiredMark="optional"
        onFinish={values => handleSubmit(onFinish(values as IProfileQuestions))}
      >
        <Form.Item
          label={t('description.profileQp2.skills_top')}
          name={profileQ2.skills}
          rules={[
            {
              validator: (_, value = profileQ2.emptyStr) => {
                if (!value.length) {
                  return Promise.reject(t('description.profileQp2.mesSkills'));
                }
                if (value.length < 3) {
                  return Promise.reject(
                    t('description.profileQp2.mesSkillsMin'),
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
          wrapperCol={{
            sm: { span: 12, offset: 0 },
          }}
        >
          <Select
            mode="multiple"
            size="large"
            options={getOptionsForSelectWithId(skills)}
            placeholder={t('description.profileQp2.skills_descr')}
            showSearch
            tokenSeparators={[',']}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp2.category')}
          name={profileQ2.category}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp2.mesCategory')}`,
            },
          ]}
        >
          <Select
            size="large"
            showSearch
            placeholder={t('description.profileQp2.category')}
            options={getOptionsForSelectWithId(categories)}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name={profileQ2.englishLevel}
          label={t('description.profileQp2.english_level')}
        >
          <Select
            placeholder={t('description.profileQp2.english_level_descr')}
            size="large"
            options={getOptionsForSelectString(englishLevels)}
          />
        </Form.Item>
        <Form.Item
          label={t('description.profileQp2.other_exp')}
          name={profileQ2.otherExp}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp2.mesOtherExp')}`,
            },
          ]}
          wrapperCol={{
            sm: { span: 12, offset: 0 },
          }}
        >
          <St.StTextArea
            placeholder={t('description.profileQp2.other_exp_descr')}
            allowClear
            rows={4}
          />
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
