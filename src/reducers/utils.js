const convertToArray = obj => Object.keys(obj || {}).map(key => obj[key]);

const convertToObject = (array, key = "id") => {
  const obj = {};

  array.forEach(element => {
    obj[element[key]] = element;
  });

  return obj;
};

const groupBy = (inputArray, key) =>
  inputArray.reduce((accumulator, entry) => {
    (accumulator[entry[key]] = accumulator[entry[key]] || []).push(entry);
    return accumulator;
  }, {});

export { convertToArray, convertToObject, groupBy };
