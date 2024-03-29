declare let process: {
  env: {
    NX_API_URL: string;
    NX_WEBSOCKET_URL: string;
  };
};

export const baseUrl: string = (process.env.NX_API_URL as string) || '';
export const websocketUrl: string =
  (process.env.NX_WEBSOCKET_URL as string) || '';

export enum ApiRoutes {
  USER = '/user',
  AUTH = '/auth',
  PROPERTIES = '/properties',
  JOBS = '/jobs',
  INVITE = '/invite',
  CHAT = '/chat',
  REQUEST = '/request',
  CONTRACTS = '/contracts',
  NOTIFICATIONS = '/notifications',
}

export const keepUnusedDataFor = 0.01;
