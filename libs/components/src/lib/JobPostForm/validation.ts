import * as yup from 'yup';

import { validation } from '../constants';

export type InputsValues = {
  projectName: string;
  about: string;
  jobCategory: string;
  skills: string[];
};

export type InputsValuesSecondPage = {
  englishLevel: string;
  duration: string;
  durationAmount: number;
};

const { atLeastThree, mustBeNumber, required } = validation;

export const schema: yup.SchemaOf<InputsValues> = yup.object({
  projectName: yup.string().required(required),
  about: yup.string().required(required),
  jobCategory: yup.string().required(required),
  skills: yup.array().required(required).min(3, atLeastThree),
});

export const schemaSecondPage: yup.SchemaOf<InputsValuesSecondPage> =
  yup.object({
    englishLevel: yup.string().required(required),
    duration: yup.string().required(required),
    durationAmount: yup
      .number()
      .typeError(mustBeNumber)
      .positive()
      .required(required),
  });
