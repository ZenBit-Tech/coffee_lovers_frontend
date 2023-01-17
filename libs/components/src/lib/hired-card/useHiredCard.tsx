import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from 'antd';
import { t } from 'i18next';
import { CheckCircleOutlined } from '@ant-design/icons';
import { NotificationType } from '@freelance/components';
import { Contract } from 'src/redux/types/contracts.types';
import { User } from 'src/redux/types/user.types';

interface UseHiredCardReturn {
  closeContractHandler: () => void;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const useHiredCard = (
  contract: Contract,
  freelancer: User,
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void,
): UseHiredCardReturn => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeContractHandler = (): void => {
    Modal.confirm({
      title: t('postedJobDetails.modal.closeContract'),
      icon: <CheckCircleOutlined />,
      content: `${freelancer.first_name} ${freelancer.last_name}`,
      okText: t('postedJobDetails.modal.confirm'),
      cancelText: t('postedJobDetails.modal.cancel'),
      onOk() {
        setIsModalOpen(true);
      },
    });
  };

  return {
    closeContractHandler,
    isModalOpen,
    setIsModalOpen,
  };
};

export default useHiredCard;
