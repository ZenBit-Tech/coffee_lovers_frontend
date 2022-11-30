import { validation } from '.';
import * as yup from 'yup';

export type InputsValues = {
  projectName: string;
  about: string;
  jobCategory: string;
  skills: number[];
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
  englishLevel: yup.string().required(required),
  duration: yup.string().required(required),
  durationAmount: yup
    .number()
    .typeError(mustBeNumber)
    .positive()
    .required(required),
});
