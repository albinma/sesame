export const toBoolean = (str: unknown, defaultValue = false): boolean => {
  if (typeof str === 'string') {
    return str?.toLocaleLowerCase()?.trim() === 'true' ?? defaultValue;
  } else {
    return str === true ?? defaultValue;
  }
};
