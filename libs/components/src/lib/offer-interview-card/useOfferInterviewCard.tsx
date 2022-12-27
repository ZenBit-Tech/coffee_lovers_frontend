import { Modal } from 'antd';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { routes } from '@freelance/components';

interface UseOfferInterviewCardReturn {
  t: TFunction;
  confirmAcceptOffer: (jobTitle: string) => void;
  confirmDeclineOffer: (jobTitle: string) => void;
  confirmDeleteInterview: (jobTitle: string) => void;
  jobClickHandler: (id?: number) => void;
}

const useOfferInterviewCard = (): UseOfferInterviewCardReturn => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const confirmAcceptOffer = (jobTitle: string): void => {
    Modal.confirm({
      title: t('offers.modal.acceptOfferTitle'),
      icon: <CheckCircleOutlined />,
      content: jobTitle,
      okText: t('offers.modal.confirm'),
      cancelText: t('offers.modal.cancel'),
      onOk() {
        return;
      },
    });
  };

  const confirmDeclineOffer = (jobTitle: string): void => {
    Modal.confirm({
      title: t('offers.modal.declineOfferTitle'),
      icon: <CloseCircleOutlined />,
      content: jobTitle,
      okText: t('offers.modal.confirm'),
      cancelText: t('offers.modal.cancel'),
      onOk() {
        return;
      },
    });
  };

  const confirmDeleteInterview = (jobTitle: string): void => {
    Modal.confirm({
      title: t('offers.modal.deleteInterviewTitle'),
      icon: <CloseCircleOutlined />,
      content: jobTitle,
      okText: t('offers.modal.confirm'),
      cancelText: t('offers.modal.cancel'),
      onOk() {
        return;
      },
    });
  };

  return {
    t,
    confirmAcceptOffer,
    confirmDeclineOffer,
    confirmDeleteInterview,
    jobClickHandler: (id?: number) =>
      navigate(generatePath(routes.jobDetails, { id })),
  };
};

export default useOfferInterviewCard;
