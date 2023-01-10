import { FC } from 'react';
import { Form, Select } from 'antd';
import { t } from 'i18next';
import {
  DefInput,
  profileQ1,
  profileQ2,
  StyledSelect,
} from '@freelance/components';
import useProperties from 'src/hooks/useProperties';
import { GetEducation, GetWorkhistory, User } from 'src/redux/types/user.types';

import FormEduList from './FormEduList';
import FormWorkList from './FormWorkList';
import { IProfileQuestions } from './model';
import * as St from './styles';
import { useFreelacerProfileForm } from './useFreelacerProfileForm';

interface freelancerFormProps {
  user?: User;
  work?: GetWorkhistory[];
  education?: GetEducation[];
  navigation?: string;
  submitText: string;
  isLoadingWork?: boolean;
}

export const FreelancerForm: FC<freelancerFormProps> = ({
  user,
  work,
  education,
  navigation,
  submitText,
}) => {
  const {
    categories,
    skills,
    englishLevels,
    getOptionsForSelectString,
    getOptionsForSelectWithId,
  } = useProperties();
  const { contextHolder, handleSubmit, onFinish, form } =
    useFreelacerProfileForm(navigation);

  return (
    <St.StForm
      name={profileQ1.form}
      {...profileQ1.formItemLayout}
      initialValues={{
        remember: true,
        [profileQ1.hR]: user?.hourly_rate,
        [profileQ1.descr]: user?.description,
        [profileQ1.pos]: user?.position,
        [profileQ2.skills]: user?.skills.map(el => el.id),
        [profileQ2.category]: user?.category?.id,
        [profileQ1.avTime]: user?.available_time,
        [profileQ2.englishLevel]: user?.english_level,
        [profileQ2.otherExp]: user?.other_experience,
      }}
      autoComplete="on"
      form={form}
      labelAlign="left"
      requiredMark="optional"
      onFinish={values => handleSubmit(onFinish(values as IProfileQuestions))}
    >
      {contextHolder}
      <Form.Item
        label={t('description.profileQp1.hR')}
        name={profileQ1.hR}
        rules={[
          { required: true, message: `${t('description.profileQp1.mesHR')}` },
        ]}
      >
        <St.StInputNumber
          prefix={t('description.profileQp1.hRPrefix')}
          placeholder={t('description.profileQp1.hRSuffix')}
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
          <Select.Option value={profileQ1.partTime}>
            {t('description.profileQp1.partTime')}
          </Select.Option>
          <Select.Option value={profileQ1.fullTime}>
            {t('description.profileQp1.fullTime')}
          </Select.Option>
        </StyledSelect>
      </Form.Item>
      <FormEduList education={education} />
      <FormWorkList work={work} />
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
                return Promise.reject(t('description.profileQp2.mesSkillsMin'));
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
          showArrow
          tokenSeparators={[',']}
          optionFilterProp="children"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
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
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
          {submitText}
        </St.StSubButton>
      </Form.Item>
    </St.StForm>
  );
};
