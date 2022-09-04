import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const plain = (data, acc = '') => {
  const result = data.map((obj) => {
    switch (obj.type) {
      case 'added':
        return `Property '${acc}${obj.key}' was added with value: ${getValue(obj.val)}`;
      case 'removed':
        return `Property '${acc}${obj.key}' was removed`;
      case 'changed':
        return `Property '${acc}${obj.key}' was updated. From ${getValue(obj.val1)} to ${getValue(obj.val2)}`;
      case 'unchanged':
        return 'unchanged';
      case 'object':
        return plain(obj.children, `${acc}${obj.key}.`);
      default:
        throw new Error('Unexpected type');
    }
  });
  return [...result.filter((string) => string !== 'unchanged')].join('\n');
};

export default plain;
