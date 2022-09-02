import fs from 'fs';
import path from 'path';
import process from 'process';
import stylish from './stylish.js';
import parse from './parsers.js';
import getDifferenceTree from './diff_tree_maker.js';


const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(readFile(filepath1), getFormat(filepath1));
  const file2 = parse(readFile(filepath2), getFormat(filepath2));
  const differenceTree = getDifferenceTree(file1, file2)
  return stylish(differenceTree);
};

export default genDiff;
