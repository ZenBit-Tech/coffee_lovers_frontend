import { baseUrl } from '@freelance/constants';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { RootState } from 'redux/store';

export const getHeaders = (): ((
  headers: Headers,
  api: Pick<BaseQueryApi, 'getState'>,
) => MaybePromise<void | Headers> | undefined) => {
  return (
    headers: Headers,
    api: Pick<BaseQueryApi, 'getState'>,
  ): MaybePromise<void | Headers> | undefined => {
    const token = (api.getState() as RootState).user.access_token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  };
};

export const getWebsocketHeaders = (
  token: string,
): { authorization: string } => ({
  authorization: `Bearer ${token}`,
});

export const getFileUrl = (filePath: string | undefined): string => {
  if (!filePath) return '';

  return `${baseUrl}/${filePath}`;
};
