declare let process: {
  env: {
    NX_API_URL: string;
  };
};

export const baseUrl: string = (process.env.NX_API_URL as string) || '';

export enum ApiRoutes {
  USER = '/user',
  AUTH = '/auth',
  PROPERTIES = '/properties',
  JOBS = '/jobs',
  INVITE = '/invite',
}
