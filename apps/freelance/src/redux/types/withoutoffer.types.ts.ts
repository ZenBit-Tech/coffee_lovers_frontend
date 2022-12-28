export interface OffersJobs {
  id: number;
  title: string;
  description: string;
  hourly_rate: number;
  category: number;
  english_level: string;
  skills: number[];
  duration: number;
  duration_amount: string;
  available_time: string;
  count: number;
}

export interface InviteJobs {
  id: number;
  title: string;
  description: string;
  hourly_rate: number;
  category: number;
  english_level: string;
  skills: number[];
  duration: number;
  duration_amount: string;
  available_time: string;
  offersCount: number;
  count: number;
}
