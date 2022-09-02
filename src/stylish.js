import _ from 'lodash';

const getStatus = (obj) => {
  const status = obj.type;
  switch (status) {
    case 'removed':
      return '-'
    case 'added':
      return '+'
    case 'unchanged':
    case 'object':
      return ' '
    default:
      throw new Error('Unsopported Type')
  }
}

const stylish = (data, replacer = '  ', space = 1) => {

  const iter = (node, depth = 1) => {
    const indent = replacer.repeat(depth * space);
    const bracketIndent = replacer.repeat((depth - 1) * space);
    const value = node.map((obj) => {
      const status = getStatus(obj);
      if (obj.type !== 'object') {
        return `${indent}${status} ${obj.key}: ${obj.val}`
      }
      return `${indent}${status} ${obj.key}: ${iter(obj.val, depth + 1)}`})
    return ['{', ...value, `${bracketIndent}}`].join('\n')
  }
  return iter(data)
}
//  `${indent}${status} ${obj.key}: ${iter(obj.val, depth + 1)}`
export default stylish;
