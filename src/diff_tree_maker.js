import _ from 'lodash';

const getDifferenceTree = (file1, file2) => {
  const result = _.sortBy(Object.keys({ ..._.cloneDeep(file1), ..._.cloneDeep(file2) }));
  return result.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (!Object.hasOwn(file1, key)) {
      return { key, type: 'added', val: value2 };
    }
    if (!Object.hasOwn(file2, key)) {
      return { key, type: 'removed', val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'object', children: getDifferenceTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key, type: 'changed', val1: value1, val2: value2,
      };
    }
    return { key, type: 'unchanged', val: value1 };
  });
};

export default getDifferenceTree;
