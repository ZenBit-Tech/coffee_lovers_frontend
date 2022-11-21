import { Form, Select, Upload } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import {
  englishOptions,
  multipleSelectOptions,
  prBarStrColor,
  prBarTrailColor,
  profileQ2,
  ProgressBar,
  skillsOptions,
} from '@freelance/components';

import { IProfileQuestions2 } from './model';
import * as St from './styles';

export const ProfileQuestions2 = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<IProfileQuestions2>();
  const [form] = Form.useForm();

  const onFinish: SubmitHandler<IProfileQuestions2> = async values => {
    alert(values);
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
        onFinish={values =>
          handleSubmit(onFinish(values as IProfileQuestions2))
        }
      >
        <Form.Item
          label={t('description.profileQp2.skills_top')}
          name={profileQ2.skills}
          rules={[
            {
              required: true,
              message: `${t('description.profileQp2.mesSkills')}`,
            },
          ]}
          wrapperCol={{
            sm: { span: 12, offset: 0 },
          }}
        >
          <Select
            mode="tags"
            size="large"
            options={skillsOptions}
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
            options={multipleSelectOptions}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.value ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.value ?? '')
                .toLowerCase()
                .localeCompare((optionB?.value ?? '').toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name={profileQ2.englishLevel}
          label={t('description.profileQp2.english_level')}
        >
          <Select
            style={{ width: '100%' }}
            placeholder={t('description.profileQp2.english_level_descr')}
            size="large"
            defaultValue={t('description.profileQp2.english_level_descr')}
            options={englishOptions}
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
