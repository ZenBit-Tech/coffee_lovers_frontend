import { FC } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { DefInput, profileQ1 } from '@freelance/components';
import { mockEducation } from '@freelance/components';

import { convertEduTime } from './hooks';
import * as St from './styles';

interface freelancerEduProps {
  education?: mockEducation[];
}

const FormEduList: FC<freelancerEduProps> = ({ education }) => {
  const { t } = useTranslation();

  return (
    <Form.List
      name={profileQ1.edu}
      initialValue={education && convertEduTime(education)}
    >
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <St.StFormList key={key}>
              <Form.Item
                label={t('description.profileQp1.edu')}
                wrapperCol={{
                  sm: { span: 24, offset: 0 },
                }}
              >
                <Input.Group compact>
                  <Form.Item
                    {...restField}
                    name={[name, profileQ1.eduInfo]}
                    rules={[
                      {
                        required: true,
                        message: `${t('description.profileQp1.mesEdu')}`,
                      },
                    ]}
                  >
                    <DefInput
                      placeholder={t('description.profileQp1.infoEdu')}
                    />
                  </Form.Item>
                  <St.StFormItemDateFrom
                    {...restField}
                    name={[name, profileQ1.eduForm]}
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
                    {...restField}
                    name={[name, profileQ1.eduTo]}
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
                  {fields.length > 1 && (
                    <St.StMinusOutlined onClick={() => remove(name)} />
                  )}
                </Input.Group>
              </Form.Item>
            </St.StFormList>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
              {t('description.profileQp1.add_one_more')}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default FormEduList;
