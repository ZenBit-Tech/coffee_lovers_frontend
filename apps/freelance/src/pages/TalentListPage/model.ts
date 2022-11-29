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
}

interface Category {
  name: string;
  id: number;
}

interface Name {
  last: string;
}
