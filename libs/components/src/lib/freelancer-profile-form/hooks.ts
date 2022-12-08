import moment from 'moment';
import { profileQ1 } from '@freelance/components';
import {
  AddEducation,
  AddWorkhistory,
  GetEducation,
  GetWorkhistory,
  UpdateUser,
} from 'src/redux/types/user.types';

import {
  eduConvertedProps,
  IProfileQuestions,
  workConvertedProps,
} from './model';

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
    category: values.category,
    english_level: values.english_level,
    other_experience: values.other_experience,
    skills: values.skills,
  };
  const educationPayloadArr = () => {
    return values.education.map(el => {
      return {
        education_descr: el.education_descr,
        education_from: el.education_from.format(profileQ1.formatYear),
        education_to: el.education_to.format(profileQ1.formatYear),
      };
    });
  };
  const workPayloadArr = () => {
    return values.work_history_wrapper
      ?.map(el => {
        return {
          work_history_descr: el.work_history_descr,
          work_history_from: el.work_history_from?.format(profileQ1.formatYear),
          work_history_to: el.work_history_to?.format(profileQ1.formatYear),
        };
      })
      .filter(
        el =>
          el.work_history_descr || el.work_history_from || el.work_history_to,
      );
  };

  return [educationPayloadArr, userPayload, workPayloadArr];
};

export const convertWorkTime = (
  work: GetWorkhistory[],
): workConvertedProps[] => {
  return work?.map(el => {
    return {
      id: el.id,
      work_history_descr: el.work_history_descr,
      work_history_from: moment(el.work_history_from),
      work_history_to: moment(el.work_history_to),
    };
  });
};

export const convertEduTime = (
  education: GetEducation[],
): eduConvertedProps[] => {
  return education?.map(el => {
    return {
      id: el.id,
      education_descr: el.education_descr,
      education_from: moment(el.education_from),
      education_to: moment(el.education_to),
    };
  });
};
