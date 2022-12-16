import { GetEducation, GetWorkhistory, User } from './user.types';

export interface FreelancerDataById extends User {
  workHistory?: GetWorkhistory[];
  educations: GetEducation[];
}
