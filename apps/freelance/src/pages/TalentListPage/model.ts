export interface User {
  last_name: string;
  first_name: string;
  id: number;
  email: string;
  name: Name;
  profile_image: string;
  category: Category;
  position: string;
  available_time: string;
  hourly_rate: string;
  description: string;
}

interface Category {
  name: string;
  id: number;
}

interface Name {
  last: string;
}

export interface GetFreelancerParams {
  limit?: number;
  skills?: number[];
  categories?: number[];
  hourly_rate_start?: number;
  hourly_rate_end?: number;
  available_time?: string;
  english_level?: string;
  search?: string;
  page?: number;
}
