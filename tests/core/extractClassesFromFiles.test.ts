import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { extractClassesFromFiles } from '../../src/core/extractClassesFromFiles';

describe('extractClassesFromFiles', () => {
  const basePath = path.resolve(__dirname, '__fixtures__/extract');

  beforeAll(() => {
    fs.mkdirSync(basePath, { recursive: true });
    fs.writeFileSync(
      path.join(basePath, 'index.html'),
      `
      <div class="btn btn-primary"></div>
      <span class="d-block text-muted"></span>
    `
    );
  });

  afterAll(() => {
    fs.rmSync(basePath, { recursive: true, force: true });
  });

  it('should extract all classes from supported files', () => {
    const files = [path.join(basePath, 'index.html')];
    const result = extractClassesFromFiles(files);

    const expected = ['btn', 'btn-primary', 'd-block', 'text-muted'].sort();
    expect(result).toEqual(expected);
  });

  it('should skip files with unsupported extensions', () => {
    const unsupportedFile = path.join(basePath, 'ignore.txt');
    fs.writeFileSync(unsupportedFile, 'random content');

    const result = extractClassesFromFiles([unsupportedFile]);

    expect(result).toEqual([]);
  });
});
