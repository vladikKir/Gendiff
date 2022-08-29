import fs from 'fs';
import path from 'path';
import process from 'process';
import getDifference from './utilits.js';
import parse from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(readFile(filepath1), getFormat(filepath1));
  const file2 = parse(readFile(filepath2), getFormat(filepath2));
  return getDifference(file1, file2);
};

export default genDiff;
