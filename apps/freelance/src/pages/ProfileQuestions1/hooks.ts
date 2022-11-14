import { profileQ1Payload } from 'redux/services/types/profileQuestions1.types';

import { IProfileQuestions1 } from './model';

export const onFinishLogic = (values: IProfileQuestions1): profileQ1Payload => {
  const jsonedEdu = JSON.parse(JSON.stringify(values.education));
  const jsonedWork = JSON.parse(JSON.stringify(values.work_history_wrapper));
  const returnedValues = {
    ...values,
    education_descr: jsonedEdu.information_about_education,
    education_from: jsonedEdu.education_from.substring(0, 4),
    education_to: jsonedEdu.education_to.substring(0, 4),
    work_history_descr: jsonedEdu.work_history,
    work_history_from: jsonedWork.work_from.substring(0, 4),
    work_history_to: jsonedWork.work_to.substring(0, 4),
  };

  return returnedValues;
};
