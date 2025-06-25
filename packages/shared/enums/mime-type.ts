/**
 * @enum MimeType
 * @description Enum for the mime types
 */
export enum MimeType {
  IMAGE_JPG = 'image/jpg',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
  IMAGE_SVG = 'image/svg+xml',
  IMAGE_GIF = 'image/gif',
  TEXT_PLAIN = 'text/plain',
  APPLICATION_PDF = 'application/pdf',
  APPLICATION_DOC = 'application/msword',
  APPLICATION_DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  APPLICATION_XLS = 'application/vnd.ms-excel',
  APPLICATION_XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  APPLICATION_ZIP = 'application/zip',
  APPLICATION_7Z = 'application/x-7z-compressed',
}

/**
 * @type AllMimeTypes
 * @description Array of all the mime types
 */
export const AllMimeTypes = [
  MimeType.IMAGE_JPG,
  MimeType.IMAGE_JPEG,
  MimeType.IMAGE_PNG,
  MimeType.IMAGE_SVG,
  MimeType.IMAGE_GIF,
  MimeType.TEXT_PLAIN,
  MimeType.APPLICATION_PDF,
  MimeType.APPLICATION_DOC,
  MimeType.APPLICATION_DOCX,
  MimeType.APPLICATION_XLS,
  MimeType.APPLICATION_XLSX,
  MimeType.APPLICATION_ZIP,
  MimeType.APPLICATION_7Z,
];

/**
 * @type ImgMimeTypes
 * @description Array of the image mime types
 */
export const ImgMimeTypes = [MimeType.IMAGE_JPG, MimeType.IMAGE_JPEG, MimeType.IMAGE_PNG, MimeType.IMAGE_SVG];

/**
 * @type DocMimeTypes
 * @description Array of the document mime types
 */
export const DocMimeTypes = [
  MimeType.APPLICATION_DOC,
  MimeType.APPLICATION_DOCX,
  MimeType.APPLICATION_XLS,
  MimeType.APPLICATION_XLSX,
  MimeType.APPLICATION_PDF,
  MimeType.TEXT_PLAIN,
];

/**
 * @type MimeTypeMap
 * @description Map of the mime types
 */
export const MimeTypeMap = {
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/png': '.png',
  'image/svg+xml': '.svg',
  'image/gif': '.gif',
  'text/plain': '.txt',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/zip': '.zip',
  'application/x-7z-compressed': '.7z',
};
