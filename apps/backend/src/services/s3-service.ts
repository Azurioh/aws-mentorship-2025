import {
  DeleteObjectCommand,
  GetObjectCommand,
  type GetObjectCommandInput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { environment } from '@config/environment';
import type { Directory, S3PutSingleObjectInput, S3PutSingleObjectOutput, UrlId } from '@entities/s3';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import ApiError from '@utils/api-error';
import getExtension from '@utils/get-ext';
import { v4 } from 'uuid';

/**
 * @class S3Service
 * @description Service for the S3 bucket
 */
export default class S3Service {
  private client: S3Client;
  private bucketName: string;

  /**
   * @constructor
   * @description Constructor for the S3Service class
   */
  constructor() {
    const infos: Record<string, unknown> = {
      region: environment.REGION,
      credentials: {
        accessKeyId: environment.AWS_KEY,
        secretAccessKey: environment.AWS_SECRET,
      },
    };

    this.client = new S3Client(infos);
    this.bucketName = environment.AWS_BUCKET_NAME;
  }

  /**
   * @function generatePutPresignedUrl
   * @description Generate a presigned url for the put object command
   * @param directory - The directory to upload the file to
   * @param mimeType - The mime type of the file
   * @param allowedMimeTypes - The allowed mime types
   * @param key - The key of the file
   * @param fileSize - The size of the file
   * @param expiresIn - The expiration time of the presigned url
   * @returns The presigned url
   */
  private async generatePutPresignedUrl(
    directory: Directory,
    mimeType: string,
    allowedMimeTypes: string[],
    key: string,
    fileSize: number,
    expiresIn = 30000,
  ): Promise<UrlId> {
    const id = v4();
    let file: string;

    if (!allowedMimeTypes.includes(mimeType)) {
      throw new ApiError(HttpStatusCode.badRequest, Errors.INVALID_MIME_TYPE, 'Invalid mime type');
    }

    if (directory === 'images') {
      const extension = getExtension(key);

      if (!extension) {
        throw new ApiError(HttpStatusCode.badRequest, Errors.INVALID_FILE_EXTENSION, 'Invalid file extension');
      }
      file = id + extension;
    } else {
      file = `${id}/${key}`;
    }
    const path = `${directory}/${file}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: path,
      ContentType: mimeType,
      ContentLength: fileSize,
    });

    const signedUrl = await getSignedUrl(this.client, command, { expiresIn });

    return { file: `${path}`, url: signedUrl };
  }

  /**
   * @function generatePutPresignedUrlV2
   * @description Generate a presigned url for the put object command
   * @param document - The document to upload
   * @param allowedMimeTypes - The allowed mime types
   * @param directory - The directory to upload the file to
   * @param expiresIn - The expiration time of the presigned url
   * @returns The presigned url
   */
  public async generatePutPresignedUrlV2(
    document: S3PutSingleObjectInput,
    allowedMimeTypes: string[],
    directory: Directory,
    expiresIn = 30000,
  ): Promise<S3PutSingleObjectOutput> {
    const name = document.name.replace(' ', '_');
    const { file, url } = await this.generatePutPresignedUrl(
      directory,
      document.mimeType,
      allowedMimeTypes,
      name,
      document.size,
      expiresIn,
    );

    return {
      name,
      mimeType: document.mimeType,
      size: document.size,
      file,
      url,
    };
  }

  /**
   * @function generateGetPreSignedUrl
   * @description Generate a presigned url for the get object command
   * @param key - The key of the file
   * @param downloadFileName - The download file name
   * @param expiresIn - The expiration time of the presigned url
   * @returns The presigned url
   */
  public async generateGetPreSignedUrl(key: string, downloadFileName?: string, expiresIn = 36000): Promise<string> {
    const commandParams: GetObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
    };

    if (downloadFileName) {
      commandParams.ResponseContentDisposition = `attachment; filename="${downloadFileName}"`;
    }

    const command = new GetObjectCommand(commandParams);
    const signedUrl = await getSignedUrl(this.client, command, { expiresIn });

    return signedUrl;
  }

  /**
   * @function deleteObject
   * @description Delete an object from the S3 bucket
   * @param key - The key of the file
   * @returns True if the object was deleted, false otherwise
   */
  public async deleteObject(key: string): Promise<boolean> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );

      return true;
    } catch (err: unknown) {
      if (err instanceof Error && (err.name === 'NoSuchKey' || err.name === 'NoSuchBucket')) {
        return false;
      }
      throw err;
    }
  }
}
