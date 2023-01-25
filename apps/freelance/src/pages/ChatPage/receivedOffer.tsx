import { useEffect } from 'react';
import { Modal, ModalProps, Space, Typography } from 'antd';
import { t } from 'i18next';
import {
  DangerButton,
  modalWidth,
  NotificationType,
  SuccessButton,
} from '@freelance/components';
import {
  useAcceptOfferMutation,
  useDeclineOfferMutation,
} from 'redux/services/requestApi';
import { Offer } from 'redux/types/request.types';

import { ReceivedOfferWrapper } from './styles';

const { Paragraph, Text, Title } = Typography;

export const ReceivedOfferModal = ({
  openModal,
  offer,
  onCancel,
  openNotificationWithIcon,
  ...props
}: {
  openModal: boolean;
  offer?: Offer;
  onCancel: () => void;
  openNotificationWithIcon: (
    type: NotificationType,
    message: string,
    description: string,
  ) => void;
} & ModalProps) => {
  const [
    acceptOffer,
    { isSuccess: acceptOfferSuccess, isError: acceptOfferError },
  ] = useAcceptOfferMutation();
  const [
    declineOffer,
    { isSuccess: declineOfferSuccess, isError: declineOfferError },
  ] = useDeclineOfferMutation();

  const onAccept = () => {
    try {
      offer && acceptOffer(offer.id);
      onCancel();
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
    }
  };

  const onDecline = () => {
    try {
      offer && declineOffer(offer.id);
      onCancel();
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
    }
  };

  useEffect(() => {
    if (acceptOfferSuccess) {
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        t('offers.receive.accepted'),
        t('offers.receive.acceptedMessage'),
      );
    }
    if (declineOfferSuccess) {
      openNotificationWithIcon(
        NotificationType.INFO,
        t('offers.receive.declined'),
        t('offers.receive.declinedMessage'),
      );
    }
    if (acceptOfferError || declineOfferError) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
    }
  }, [
    acceptOfferSuccess,
    declineOfferSuccess,
    acceptOfferError,
    declineOfferError,
  ]);

  return (
    <Modal
      {...props}
      open={openModal}
      onCancel={onCancel}
      centered
      width={modalWidth}
      footer={null}
    >
      <ReceivedOfferWrapper align="center" direction="vertical">
        <Title level={2}>{t('offers.receive.title')}</Title>

        {offer && (
          <>
            <Title level={3}>{offer.job.title}</Title>
            <Paragraph>
              <Text strong>{t('offers.receive.rate')} </Text>
              <Text>${offer.job.hourly_rate} </Text>
            </Paragraph>
            <Paragraph>
              <Text strong>{t('offers.receive.start')}</Text>
              <Text> {offer.start}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>{t('offers.receive.description')}</Text>{' '}
              {offer.job.description}
            </Paragraph>
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
      </ReceivedOfferWrapper>
    </Modal>
  );
};
