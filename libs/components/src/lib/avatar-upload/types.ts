import { UploadProps } from 'antd';

export enum FileTypes {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
}

export type CustomRequestOptions = Parameters<
  Exclude<UploadProps['customRequest'], undefined>
>[0];
