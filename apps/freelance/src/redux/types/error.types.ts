export interface ApiError {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}
