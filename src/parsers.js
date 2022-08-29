import yaml from 'js-yaml';

export default (file, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(file);
  } if (fileFormat === 'yml' || fileFormat === 'yaml') {
    return yaml.load(file);
  }
  throw new Error('Unsupported file type');
};
