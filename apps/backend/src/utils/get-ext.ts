/**
 * @function getExtension
 * @description Get the extension of the filename
 * @param filename - The filename to get the extension of
 * @returns The extension of the filename or null if there is no extension
 */
const getExtension = (filename: string): string | null => {
  const index = filename.lastIndexOf('.');

  if (index > 0) {
    return filename.substring(index);
  }
  return null;
};

export default getExtension;
