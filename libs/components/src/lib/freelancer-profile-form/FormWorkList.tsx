import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { profileQ1 } from '@freelance/components';

import * as St from './styles';

const FormWorkList = () => {
  const { t } = useTranslation();

  return (
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
                        message: `${t('description.profileQp1.mesTimeFrom')}`,
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
            <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
              {t('description.profileQp1.add_one_more')}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default FormWorkList;
