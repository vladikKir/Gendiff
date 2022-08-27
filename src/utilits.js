import _ from 'lodash';

const getDifference = (file1, file2) => {
  const file1Diff = _.mapKeys(file1, (value, key) => {
    if (Object.hasOwn(file2, key)) {
      if (file1[key] !== file2[key]) {
        return `- ${key}`;
      }
      return `  ${key}`;
    }
    return `- ${key}`;
  });
  const file2Diff = _.mapKeys(file2, (value, key) => {
    if (Object.hasOwn(file1, key)) {
      if (file1[key] !== file2[key]) {
        return `+ ${key}`;
      }
      return `  ${key}`;
    }
    return `+ ${key}`;
  });
  const difference = `${Object.entries(Object.assign(file1Diff, file2Diff))
    .sort((a, b) => {
      if (a[0][2] === b[0][2]) {
        return 0;
      }
      return a[0][2] > b[0][2] ? 1 : -1;
    })
    .reduce((acc, element) => `${acc}\n  ${element[0]}: ${element[1]}`, '{')}\n}`;

  return difference;
};

export { getDifference };
