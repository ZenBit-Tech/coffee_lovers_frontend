import { validation } from '.';
import * as yup from 'yup';

export type InputsValues = {
  title: string;
  description: string;
  hourly_rate: number;
  category: string;
  skills: number[];
  english_level: string;
  duration_amount: number;
  duration: string;
  available_time: string;
};

const { atLeastThree, mustBeNumber, required } = validation;

export const schema: yup.SchemaOf<InputsValues> = yup.object({
  title: yup.string().required(required),
  description: yup.string().required(required),
  hourly_rate: yup.number().required(required),
  category: yup.string().required(required),
  skills: yup.array().required(required).min(3, atLeastThree),
  english_level: yup.string().required(required),
  duration_amount: yup
    .number()
    .typeError(mustBeNumber)
    .positive()
    .required(required),
  duration: yup.string().required(required),
  available_time: yup.string().required(required),
});
