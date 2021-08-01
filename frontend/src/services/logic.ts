export const isEmptyObject = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

export const isEmptyArray = (arr: Array<any>) => {
  return arr.length === 0;
};
