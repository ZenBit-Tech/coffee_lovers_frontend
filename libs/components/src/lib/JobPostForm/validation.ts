import * as yup from 'yup';

export type InputsValues = {
  projectName: string;
  about: string;
  englishLevel: string;
  jobCategory: string[];
};

export const schema: yup.SchemaOf<InputsValues> = yup.object({
  projectName: yup.string().required(),
  about: yup.string().required(),
  englishLevel: yup.string().required(),
  jobCategory: yup.array().required(),
});
