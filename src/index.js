import fs from 'fs';
import path from 'path';
import process from 'process';
import { getDifference } from './utilits.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFile(filepath1));
  const file2 = JSON.parse(readFile(filepath2));
  return getDifference(file1, file2);
};

export default genDiff;
