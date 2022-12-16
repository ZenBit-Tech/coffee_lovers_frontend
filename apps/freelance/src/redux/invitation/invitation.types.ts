export interface Error {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}

export interface InviteParams {
  frId?: number | null;
}
