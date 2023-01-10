import { Modal, ModalProps, Space } from 'antd';
import { t } from 'i18next';
import {
  DangerButton,
  modalWidth,
  NotificationType,
  SuccessButton,
} from '@freelance/components';
import { GetOffersResponse } from 'redux/invite/types';
import {
  useAcceptOfferMutation,
  useDeclineOfferMutation,
} from 'redux/services/requestApi';

export const ReceivedOfferModal = ({
  openModal,
  offer,
  onCancel,
  openNotificationWithIcon,
  ...props
}: {
  openModal: boolean;
  offer?: GetOffersResponse;
  onCancel: () => void;
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
} & ModalProps) => {
  const [acceptOffer] = useAcceptOfferMutation();
  const [declineOffer] = useDeclineOfferMutation();
  const onAccept = () => {
    offer && acceptOffer(offer.id);
    onCancel();
  };

  const onDecline = () => {
    offer && declineOffer(offer.id);
    onCancel();
  };

  return (
    <Modal
      {...props}
      open={openModal}
      onCancel={onCancel}
      centered
      width={modalWidth}
      footer={null}
    >
      <Space align="center" direction="vertical">
        <h2>{t('offers.receive.title')}</h2>

        {offer && (
          <>
            <p>{offer.job.title}</p>
            <p>
              <b>{t('offers.receive.rate')} </b>${offer.job.hourly_rate}
            </p>
            <p>
              <b>{t('offers.receive.start')} </b>
              {offer.start}
            </p>
            <p>
              <b>{t('offers.receive.description')} </b> {offer.job.description}
            </p>
          </>
        )}
        <Space size={60}>
          <SuccessButton onClick={onAccept}>
            {t('offers.receive.accept')}
          </SuccessButton>
          <DangerButton onClick={onDecline}>
            {t('offers.receive.decline')}
          </DangerButton>
        </Space>
      </Space>
    </Modal>
  );
};
