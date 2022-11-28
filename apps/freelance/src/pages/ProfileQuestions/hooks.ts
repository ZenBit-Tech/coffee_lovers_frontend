import { profileQ1 } from '@freelance/components';
import {
  AddEducation,
  AddWorkhistory,
  UpdateUser,
} from 'redux/services/types/user.types';

import { IProfileQuestions } from './model';

export const onFinishLogic = (
  values: IProfileQuestions,
): [
  educationPayloadArr: () => AddEducation[],
  userPayload: UpdateUser,
  workPayloadArr: () => AddWorkhistory[],
] => {
  const userPayload = {
    available_time: values.available_time,
    description: values.description,
    hourly_rate: values.hourly_rate,
    position: values.position,
  };
  const educationPayloadArr = () => {
    return values.education.map(el => {
      return {
        education_descr: el.information_about_education,
        education_from: el.education_from.format(profileQ1.formatYear),
        education_to: el.education_to.format(profileQ1.formatYear),
      };
    });
  };
  const workPayloadArr = () => {
    return values.work_history_wrapper.map(el => {
      return {
        work_history_descr: el.work_history,
        work_history_from: el.work_from.format(profileQ1.formatYear),
        work_history_to: el.work_to.format(profileQ1.formatYear),
      };
    });
  };

  return [educationPayloadArr, userPayload, workPayloadArr];
};
