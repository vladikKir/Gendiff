import _ from 'lodash';

const replacer = '    ';

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const indent = replacer.repeat(depth + 1);
  const bracketIndent = replacer.repeat(depth);
  const string = Object.entries(node).map(([key, value]) => `${indent}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...string, `${bracketIndent}}`].join('\n');
};

const stylish = (data) => {
  const iter = (node, depth = 1) => node.map((obj) => {
    const indent = replacer.repeat(depth);
    const indentBeforeSign = indent.slice(2);

    const getString = (value, sign) => `${indentBeforeSign}${sign}${obj.key}: ${stringify(value, depth)}`;
    switch (obj.type) {
      case 'added':
        return getString(obj.val, '+ ');
      case 'removed':
        return getString(obj.val, '- ');
      case 'changed':
        return `${getString(obj.val1, '- ')}\n${getString(obj.val2, '+ ')}`;
      case 'unchanged':
        return getString(obj.val, '  ');
      case 'object':
        return `${indent}${obj.key}: ${['{', ...iter(obj.children, depth + 1), `${indent}}`].join('\n')}`;
      default:
        throw new Error('Unexpected object type');
    }
  });

  return ['{', ...iter(data), '}'].join('\n');
};

export default stylish;
