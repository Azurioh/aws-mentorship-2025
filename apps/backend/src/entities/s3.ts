import type { MimeType } from '@test-connect/shared/enums/mime-type';

/**
 * @type UrlId
 * @description Type for the url and file name of the uploaded file
 */
export type UrlId = {
  file: string;
  url: string;
};

/**
 * @type Directory
 * @description Type for the directory of the uploaded file
 */
export type Directory = 'images' | 'code';

/**
 * @type S3PutSingleObjectInput
 * @description Type for the input of the put single object command
 */
export type S3PutSingleObjectInput = {
  name: string;
  mimeType: MimeType;
  size: number;
};

/**
 * @type S3PutSingleObjectOutput
 * @description Type for the output of the put single object command
 */
export type S3PutSingleObjectOutput = {
  name: string;
  mimeType: MimeType;
  size: number;
  file: string;
  url: string;
};
