import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat test', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedResult = readFile('result_flat.txt');
  expect(genDiff(file1, file2)).toBe(expectedResult);
});

test('nested test', () => {
  const file1 = getFixturePath('file1_nested.json');
  const file2 = getFixturePath('file2_nested.yaml');
  const expectedResult = readFile('result_nested.txt');
  expect(genDiff(file1, file2)).toBe(expectedResult);
  expect(genDiff(file1, file2, 'stylish')).toBe(expectedResult);
});

test('plain test', () => {
  const file1 = getFixturePath('file1_nested.json');
  const file2 = getFixturePath('file2_nested.yaml');
  const expectedResult = readFile('result_plain.txt');
  expect(genDiff(file1, file2, 'plain')).toBe(expectedResult);
});

test('json test', () => {
  const file1 = getFixturePath('file1_nested.json');
  const file2 = getFixturePath('file2_nested.yaml');
  const expectedResult = readFile('result_json.txt');
  expect(genDiff(file1, file2, 'json')).toBe(expectedResult);
});
