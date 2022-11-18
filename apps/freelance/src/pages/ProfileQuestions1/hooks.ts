import { profileQ1 } from '@freelance/components';
import { profileQ1Payload } from 'redux/services/types/profileQuestions1.types';

import { IProfileQuestions1 } from './model';

export const onFinishLogic = (values: IProfileQuestions1): profileQ1Payload => {
  return {
    ...values,
    education_descr: values.education.information_about_education,
    education_from: values.education.education_from.format(
      profileQ1.profileQ1FormatYear,
    ),
    education_to: values.education.education_to.format(
      profileQ1.profileQ1FormatYear,
    ),
    work_history_descr: values.work_history_wrapper.work_history,
    work_history_from: values.work_history_wrapper.work_from.format(
      profileQ1.profileQ1FormatYear,
    ),
    work_history_to: values.work_history_wrapper.work_to.format(
      profileQ1.profileQ1FormatYear,
    ),
  };
};
