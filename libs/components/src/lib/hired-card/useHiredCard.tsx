import { Modal } from 'antd';
import { t } from 'i18next';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useCloseContractMutation } from 'src/redux/contracts/contracts';
import { Contract } from 'src/redux/types/contracts.types';
import { User } from 'src/redux/types/user.types';

interface UseHiredCardReturn {
  closeContractHandler: () => void;
}

const useHiredCard = (
  contract: Contract,
  freelancer: User,
): UseHiredCardReturn => {
  const [closeContract] = useCloseContractMutation();

  const closeContractHandler = () => {
    Modal.confirm({
      title: t('postedJobDetails.modal.closeContract'),
      icon: <CheckCircleOutlined />,
      content: `${freelancer.first_name} ${freelancer.last_name}`,
      okText: t('postedJobDetails.modal.confirm'),
      cancelText: t('postedJobDetails.modal.cancel'),
      onOk() {
        closeContract(contract.id);
      },
    });
  };

  return {
    closeContractHandler,
  };
};

export default useHiredCard;
