import { FC } from 'react';
import { Form, Modal } from 'antd';
import { t } from 'i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  modalProps,
  modalValues,
  modalWidth,
  PrimaryButton,
  rateCommentFieldName,
  ratingFieldName,
} from '@freelance/components';
import { NotificationType, useOpenNotification } from '@freelance/components';
import { useCloseContractMutation } from 'src/redux/services/contractApi';
import { useSetFreelancerRatingMutation } from 'src/redux/services/userApi';
import { SetFreelancerRating } from 'src/redux/types/user.types';

import * as St from './styles';
import { IRatingModal } from './types';

export const RatingModal: FC<IRatingModal> = props => {
  const { isModalOpen, setIsModalOpen, job_id, freelancer_id, contract } =
    props;
  const [form] = Form.useForm();
  const { handleSubmit, control } = useForm<SetFreelancerRating>();
  const [setFreelancerRating] = useSetFreelancerRatingMutation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const [closeContract] = useCloseContractMutation();

  const messageValue = Form.useWatch(ratingFieldName, form);

  const onFinishHandler: SubmitHandler<SetFreelancerRating> = async (
    values,
  ): Promise<void> => {
    const payload: SetFreelancerRating = {
      ...values,
      job_id,
      freelancer_id,
    };
    try {
      form.resetFields();
      await setFreelancerRating(payload);
      setIsModalOpen(false);
      closeContract(contract.id);
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('ratingModal.notifFailed'),
        t('ratingModal.notifFailedMsg'),
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    closeContract(contract.id);
  };

  return (
    <Modal
      title={t('ratingModal.title')}
      open={isModalOpen}
      onCancel={handleCancel}
      width={modalWidth}
      footer={null}
    >
      <Form
        name={modalValues.formName}
        form={form}
        onFinish={(values: SetFreelancerRating) =>
          handleSubmit(onFinishHandler(values))
        }
      >
        <St.StyledFormWrapper>
          {contextHolder}
          <Controller
            name={ratingFieldName}
            control={control}
            render={({ field }) => (
              <Form.Item {...field}>
                <St.StyledRate count={modalValues.starCount}></St.StyledRate>
              </Form.Item>
            )}
          />
          <Controller
            name={rateCommentFieldName}
            control={control}
            render={({ field }) => (
              <St.StTextContainer {...field}>
                <St.StTextArea
                  autoSize={{
                    minRows: modalValues.txtAreaMinSize,
                    maxRows: modalValues.txtAreaMaxSize,
                  }}
                  placeholder={t('ratingModal.textArea')}
                  maxLength={modalProps.txAreaMaxLength}
                />
              </St.StTextContainer>
            )}
          />
          <PrimaryButton
            disabled={!messageValue}
            htmlType="submit"
            size="large"
          >
            {t('ratingModal.submitBtn')}
          </PrimaryButton>
        </St.StyledFormWrapper>
      </Form>
    </Modal>
  );
};
