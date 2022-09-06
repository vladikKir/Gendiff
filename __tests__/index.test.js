import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'result_flat.txt'],
  ['file1_nested.json', 'file2_nested.yaml', 'stylish', 'result_nested.txt'],
  ['file1_nested.json', 'file2_nested.yaml', 'plain', 'result_plain.txt'],
  ['file1_nested.json', 'file2_nested.yaml', 'json', 'result_json.txt'],
])('gendiff test %s, %s, %s', (file1, file2, format, result) => {
  const file1Path = getFixturePath(file1);
  const file2Path = getFixturePath(file2);
  const expectedResult = readFile(result);
  expect(genDiff(file1Path, file2Path, format)).toBe(expectedResult);
});
