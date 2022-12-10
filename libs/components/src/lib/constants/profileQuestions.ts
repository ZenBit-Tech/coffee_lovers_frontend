export const prBarStrColor = '#021691';
export const prBarTrailColor = '#B0C4DE';

export const route = '/user';

export const profileQ1 = {
  prBarProfileQ1Per: 20,
  form: 'profile_questions_1',
  hR: 'hourly_rate',
  descr: 'description',
  pos: 'position',
  avTime: 'available_time',
  partTime: 'Part-Time',
  fullTime: 'Full-Time',
  edu: 'education',
  eduInfo: 'education_descr',
  eduForm: 'education_from',
  eduTo: 'education_to',
  workHistoryWrapper: 'work_history_wrapper',
  workHistory: 'work_history_descr',
  workFrom: 'work_history_from',
  workTo: 'work_history_to',
  workEduDefValue: [''],
  hRMin: 0,
  formatYear: 'YYYY',
  formItemLayout: {
    labelCol: {
      sm: { span: 3 },
    },
    wrapperCol: {
      sm: { span: 4 },
    },
  },
};

export const prBarProfileQ2Per = 50;

export const validation = {
  atLeastThree: 'Enter at least 3 skills',
  required: 'This field is required',
  mustBeNumber: 'Duration must be a number',
};

export const profileQ2 = {
  prBarProfileQ2Per: 50,
  form: 'profile_questions_1',
  skills: 'skills',
  category: 'category',
  englishLevel: 'english_level',
  otherExp: 'other_experience',
  formItemLayout: {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 4 },
    },
  },
  emptyStr: '',
};
