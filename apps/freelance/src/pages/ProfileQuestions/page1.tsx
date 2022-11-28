import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  DefInput,
  prBarStrColor,
  prBarTrailColor,
  profileQ1,
  ProgressBar,
  StyledSelect,
} from '@freelance/components';
import {
  useAddUserEduInfoMutation,
  useAddUserWorkhistoryInfoMutation,
  useUpdateUserInfoMutation,
} from 'redux/profileQuestions/profileQuestions1Api';

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

  const { Option } = Select;
  const onFinish: SubmitHandler<IProfileQuestions> = async values => {
    console.log(values);
    const [educationPayload, userPayload, workArr] = onFinishLogic(values);

    try {
      await UpdateUserInfo(userPayload);
      await AddUserEduInfo(educationPayload);
      await AddUserWorkhistory(workArr());
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
            {t('description.profileQp1.upload_profile_photo')}
          </St.StUserUpBtn>
        </Upload>
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
        <Form.Item
          label={t('description.profileQp1.edu')}
          wrapperCol={{
            sm: { span: 24, offset: 0 },
          }}
        >
          <Input.Group compact>
            <Form.Item
              name={[profileQ1.edu, profileQ1.eduInfo]}
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
              name={[profileQ1.edu, profileQ1.eduForm]}
              rules={[
                {
                  required: true,
                  message: `${t('description.profileQp1.mesTimeFrom')}`,
                },
              ]}
            >
              <DatePicker
                placeholder={t('description.profileQp1.from')}
                picker="year"
              />
            </St.StFormItemDateFrom>
            <St.StFormItemDateTo
              name={[profileQ1.edu, profileQ1.eduTo]}
              rules={[
                {
                  required: true,
                  message: `${t('description.profileQp1.mesTimeTo')}`,
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
        <Form.List
          name={profileQ1.workHistoryWrapper}
          initialValue={profileQ1.workDefValue}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <St.StFormList key={key}>
                  <Form.Item
                    label={t('description.profileQp1.workH')}
                    wrapperCol={{
                      sm: { span: 24, offset: 0 },
                    }}
                  >
                    <Input.Group compact>
                      <Form.Item
                        {...restField}
                        name={[name, profileQ1.workHistory]}
                        rules={[
                          {
                            required: true,
                            message: `${t('description.profileQp1.mesWork')}`,
                          },
                        ]}
                        wrapperCol={{
                          sm: { span: 26, offset: 0 },
                        }}
                      >
                        <St.StWorkWrapper>
                          <St.StTextAreaWork
                            placeholder={t('description.profileQp1.infoWork')}
                          />
                        </St.StWorkWrapper>
                      </Form.Item>
                      <St.StFormItemWorkDateFrom
                        {...restField}
                        name={[name, profileQ1.workFrom]}
                        rules={[
                          {
                            required: true,
                            message: `${t(
                              'description.profileQp1.mesTimeFrom',
                            )}`,
                          },
                        ]}
                      >
                        <St.StDatePickerWork
                          placeholder={t('description.profileQp1.from')}
                          picker="year"
                        />
                      </St.StFormItemWorkDateFrom>
                      <St.StFormItemDateTo
                        {...restField}
                        name={[name, profileQ1.workTo]}
                        rules={[
                          {
                            required: true,
                            message: `${t('description.profileQp1.mesTimeTo')}`,
                          },
                        ]}
                      >
                        <St.StDatePickerWork
                          placeholder={t('description.profileQp1.to')}
                          picker="year"
                        />
                      </St.StFormItemDateTo>
                      {fields.length > 1 && (
                        <St.StMinusOutlined onClick={() => remove(name)} />
                      )}
                    </Input.Group>
                  </Form.Item>
                </St.StFormList>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t('description.profileQp1.add_one_more')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
