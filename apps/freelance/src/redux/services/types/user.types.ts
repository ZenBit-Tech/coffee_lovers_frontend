export interface PasswordResetPayload {
  password: string;
  key: string;
}

export interface UserError {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}

export interface UpdateUser {
  available_time?: string;
  description?: string;
  hourly_rate?: number;
  position?: string;
  category_id?: number;
  english_level?: string;
  other_experience?: string;
  skills?: number[];
  role?: string;
}

export interface AddWorkhistory {
  work_history_descr: string;
  work_history_from: string;
  work_history_to: string;
}

export interface AddEducation {
  education_descr: string;
  education_from: string;
  education_to: string;
}

export type Role = 'Freelancer' | 'JobOwner' | null;

export interface IUserInfo {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  role: Role;
}
