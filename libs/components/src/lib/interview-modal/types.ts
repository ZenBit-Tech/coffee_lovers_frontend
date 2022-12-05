import { Property } from 'src/redux/types/properties.types';
import { User } from 'src/redux/types/user.types';

export interface Job {
  id: number;
  title?: string;
  description?: string;
  hourly_rate?: number;
  available_time?: number;
  english_level?: string;
  owner: User;
  created_at: string;
  category: Property;
  skills: Property[];
}
