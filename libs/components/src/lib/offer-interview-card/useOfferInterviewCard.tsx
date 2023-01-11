import { Modal } from 'antd';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { routes } from '@freelance/components';
import {
  useAcceptOfferMutation,
  useDeclineOfferMutation,
  useDeleteInterviewMutation,
} from 'src/redux/services/requestApi';
import { Job } from 'src/redux/types/jobs.types';
import { User } from 'src/redux/types/user.types';

interface UseOfferInterviewCardReturn {
  t: TFunction;
  confirmAcceptOffer: (jobTitle: string) => void;
  confirmDeclineOffer: (jobTitle: string) => void;
  confirmDeleteInterview: (jobTitle: string) => void;
  jobClickHandler: (id?: number) => void;
  startChatHandler: () => void;
}

const useOfferInterviewCard = (
  id: number,
  user?: User,
  job?: Job,
): UseOfferInterviewCardReturn => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [acceptOffer] = useAcceptOfferMutation();
  const [declineOffer] = useDeclineOfferMutation();
  const [deleteInterview] = useDeleteInterviewMutation();

  const confirmAcceptOffer = (jobTitle: string): void => {
    Modal.confirm({
      title: t('offers.modal.acceptOfferTitle'),
      icon: <CheckCircleOutlined />,
      content: jobTitle,
      okText: t('offers.modal.confirm'),
      cancelText: t('offers.modal.cancel'),
      onOk() {
        acceptOffer(id);
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
        declineOffer(id);
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
        deleteInterview(id);
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
    startChatHandler: () =>
      navigate(
        generatePath(routes.chatUser, { userId: user?.id, jobId: job?.id }),
      ),
  };
};

export default useOfferInterviewCard;
