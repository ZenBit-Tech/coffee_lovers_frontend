import * as yup from 'yup';

import { validation } from '../constants';

export type InputsValues = {
  projectName: string;
  about: string;
  englishLevel: string;
  jobCategory: string;
  skills: string[];
};

const { atLeastThree, required } = validation;

export const schema: yup.SchemaOf<InputsValues> = yup.object({
  projectName: yup.string().required(required),
  about: yup.string().required(required),
  englishLevel: yup.string().required(required),
  jobCategory: yup.string().required(required),
  skills: yup.array().required(required).min(3, atLeastThree),
});
