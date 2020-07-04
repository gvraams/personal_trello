const convertToArray = obj => Object.keys(obj || {}).map(key => obj[key]);

const convertToObject = (array, key = "id") => {
  const obj = {};

  array.forEach(element => {
    obj[element[key]] = element;
  });

  return obj;
};

export { convertToArray, convertToObject };
