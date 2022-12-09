export interface Error {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}

export interface InviteParams {
  id: number | null | undefined;
  frId: number | null;
}
