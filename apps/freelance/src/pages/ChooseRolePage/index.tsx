import { useState } from 'react';
import { Button, Checkbox, Form, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { Role } from 'redux/services/types/user.types';
import { useAddUserRoleMutation } from 'src/redux/services/user';

import { FormWrap, InputsWrapper, InputText, Title } from './styles';

interface IRole {
  role: Role;
}

type RoleType = boolean;

const { Text } = Typography;

const ChooseRole = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role, setRole] = useState<IRole>({ role: 'Visitor' });
  const [freelancer, setFreelancer] = useState<RoleType>(false);
  const [jobOwner, setJobOwner] = useState<RoleType>(false);
  const [addUserRole] = useAddUserRoleMutation();

  const onClick = () => {
    addUserRole(role);
    freelancer
      ? navigate(`${routes.welcome}`)
      : navigate(`${routes.jobOwnerDashboard}`);
  };

  const onFreelancerClick = () => {
    if (jobOwner) {
      setJobOwner(false);
      freelancer ? setFreelancer(true) : setFreelancer(false);
    }
    freelancer ? setFreelancer(false) : setFreelancer(true);
    setRole({ role: 'Freelancer' });
  };

  const onJobOwnerClick = () => {
    if (freelancer) {
      jobOwner ? setJobOwner(true) : setJobOwner(false);
      setFreelancer(false);
    }
    jobOwner ? setJobOwner(false) : setJobOwner(true);
    setRole({ role: 'JobOwner' });
  };

  const disabled = !freelancer && !jobOwner;

  return (
    <FormWrap>
      <Title>{t('chooseRole.title')}</Title>
      <Form>
        <Form.Item>
          <InputsWrapper>
            <Checkbox
              type="checkbox"
              checked={jobOwner}
              onChange={onJobOwnerClick}
            >
              <InputText>{t('chooseRole.jobOwner')}</InputText>
            </Checkbox>

            <Checkbox
              type="checkbox"
              checked={freelancer}
              onChange={onFreelancerClick}
            >
              <InputText>{t('chooseRole.freelancer')}</InputText>
            </Checkbox>
          </InputsWrapper>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onClick}
              disabled={!freelancer && !jobOwner}
            >
              {t('resetPassword.buttonText')}
            </Button>
            {disabled && (
              <Text type="danger">{t('chooseRole.role_error')}</Text>
            )}
          </Space>
        </Form.Item>
      </Form>
    </FormWrap>
  );
};

export default ChooseRole;
