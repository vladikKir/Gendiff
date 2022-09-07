import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const plain = (data, acc = '') => data.reduce((result, obj) => {
  switch (obj.type) {
    case 'added':
      return [...result, `Property '${acc}${obj.key}' was added with value: ${getValue(obj.val)}`];
    case 'removed':
      return [...result, `Property '${acc}${obj.key}' was removed`];
    case 'changed':
      return [...result, `Property '${acc}${obj.key}' was updated. From ${getValue(obj.val1)} to ${getValue(obj.val2)}`];
    case 'object':
      return [...result, plain(obj.children, `${acc}${obj.key}.`)];
    default:
      return result;
  }
}, []).join('\n');
export default plain;
