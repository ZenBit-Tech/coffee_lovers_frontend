import { profileQ1 } from '@freelance/components';
import {
  AddEducation,
  AddWorkhistory,
  UpdateUser,
} from 'redux/types/user.types';

import { IProfileQuestions } from './model';

export const onFinishLogic = (
  values: IProfileQuestions,
): [
  educationPayload: AddEducation,
  workPayload: AddWorkhistory,
  userPayload: UpdateUser,
] => {
  const userPayload = {
    available_time: values.available_time,
    description: values.description,
    hourly_rate: values.hourly_rate,
    position: values.position,
  };
  const educationPayload = {
    education_descr: values.education.information_about_education,
    education_from: values.education.education_from.format(
      profileQ1.profileQ1FormatYear,
    ),
    education_to: values.education.education_to.format(
      profileQ1.profileQ1FormatYear,
    ),
  };
  const workPayload = {
    work_history_descr: values.work_history_wrapper.work_history,
    work_history_from: values.work_history_wrapper.work_from.format(
      profileQ1.profileQ1FormatYear,
    ),
    work_history_to: values.work_history_wrapper.work_to.format(
      profileQ1.profileQ1FormatYear,
    ),
  };

  return [educationPayload, workPayload, userPayload];
};
