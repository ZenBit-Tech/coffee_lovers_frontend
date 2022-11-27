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

export interface SetProfileImageResponse {
  file: string;
}
