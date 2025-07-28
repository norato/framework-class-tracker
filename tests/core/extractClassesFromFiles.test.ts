import fs from 'fs';
import path from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { extractClassesFromFiles } from '../../src/core/extractClassesFromFiles';

describe('extractClassesFromFiles', () => {
  const basePath = path.resolve(__dirname, '__fixtures__/extract');

  beforeAll(() => {
    fs.mkdirSync(basePath, { recursive: true });
    fs.writeFileSync(
      path.join(basePath, 'index.html'),
      '\n<div class="btn btn-primary"></div>\n<span class="d-block text-muted"></span>'
    );
  });

  afterAll(() => {
    fs.rmSync(basePath, { recursive: true, force: true });
  });

  it('should extract all classes from supported files with locations', () => {
    const filePath = path.join(basePath, 'index.html');
    const result = extractClassesFromFiles([filePath]);

    const expected = [
      { className: 'btn', file: filePath, line: 2 },
      { className: 'btn-primary', file: filePath, line: 2 },
      { className: 'd-block', file: filePath, line: 3 },
      { className: 'text-muted', file: filePath, line: 3 },
    ];

    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
