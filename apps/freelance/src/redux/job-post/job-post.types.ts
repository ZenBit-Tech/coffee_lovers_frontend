export interface Error {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}

export interface JobPost {
  title: string;
  description: string;
  hourly_rate: number;
  available_time: number;
  category: number;
  english_level: string;
  skills: number[];
}
