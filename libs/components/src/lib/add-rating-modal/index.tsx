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
import {
  useSetFreelancerRatingMutation,
  useSetJobOwnerRatingMutation,
} from 'src/redux/services/userApi';
import { SetUserRating } from 'src/redux/types/user.types';

import * as St from './styles';
import { IRatingModal } from './types';

export const RatingModal: FC<IRatingModal> = props => {
  const {
    isModalOpen,
    setIsModalOpen,
    job_id,
    freelancer_id,
    contract,
    job_owner_id,
  } = props;
  const [form] = Form.useForm();
  const { handleSubmit, control } = useForm<SetUserRating>();
  const [setFreelancerRating] = useSetFreelancerRatingMutation();
  const [setJobOwnerRating] = useSetJobOwnerRatingMutation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const [closeContract] = useCloseContractMutation();
  const messageValue = Form.useWatch(ratingFieldName, form);

  const onFinishHandler: SubmitHandler<SetUserRating> = async (
    values,
  ): Promise<void> => {
    const payload: SetUserRating = {
      ...values,
      job_id,
      ...(freelancer_id && {
        freelancer_id,
      }),
      ...(job_owner_id && {
        job_owner_id,
      }),
    };
    try {
      form.resetFields();
      if (payload.freelancer_id) {
        await setFreelancerRating(payload);
        setIsModalOpen(false);
        closeContract(contract.id);
      } else if (payload.job_owner_id) {
        await setJobOwnerRating(payload);
        setIsModalOpen(false);
      }
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
        onFinish={(values: SetUserRating) =>
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
