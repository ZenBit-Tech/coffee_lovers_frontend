import { validation } from '.';
import * as yup from 'yup';
// import { Property } from 'src/redux/types/properties.types';
import { User } from 'src/redux/types/user.types';

export type InputsValues = {
  title: string;
  description: string;
  hourly_rate: number;
  category: number;
  skills: number[];
  english_level: string;
  duration: number;
  duration_amount: string;
  available_time: string;
};

export interface GetJobResponse extends InputsValues {
  id: number;
  owner: User;
  created_at: string;
}

const { atLeastThree, mustBeNumber, required } = validation;

export const schema: yup.SchemaOf<InputsValues> = yup.object({
  title: yup.string().required(required),
  description: yup.string().required(required),
  hourly_rate: yup.number().required(required),
  category: yup.number().required(required),
  skills: yup.array().required(required).min(3, atLeastThree),
  english_level: yup.string().required(required),
  duration: yup.number().typeError(mustBeNumber).positive().required(required),
  duration_amount: yup.string().required(required),
  available_time: yup.string().required(required),
});
