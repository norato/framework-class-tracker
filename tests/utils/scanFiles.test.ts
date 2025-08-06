import fs from 'fs';
import path from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { scanFiles } from '../../src/utils/scanFiles';

describe('scanFiles', () => {
  const basePath = path.resolve(__dirname, '__fixtures__/scan');
  const nestedPath = path.join(basePath, 'nested');

  beforeAll(() => {
    fs.mkdirSync(nestedPath, { recursive: true });

    // arquivos válidos
    fs.writeFileSync(path.join(basePath, 'index.html'), '<div class="btn"></div>');
    fs.writeFileSync(path.join(basePath, 'main.ts'), 'console.log("ok")');
    fs.writeFileSync(path.join(basePath, 'style.scss'), '.btn { color: red; }');

    // arquivos inválidos
    fs.writeFileSync(path.join(basePath, 'README.md'), '# readme');
    fs.writeFileSync(path.join(basePath, 'config.json'), '{}');

    // arquivos ocultos e pasta aninhada
    fs.writeFileSync(path.join(basePath, '.hidden.ts'), '// hidden file');
    fs.writeFileSync(path.join(nestedPath, 'component.html'), '<div class="text-center"></div>');
    fs.writeFileSync(path.join(nestedPath, 'ignored.txt'), 'ignore me');
  });

  afterAll(() => {
    fs.rmSync(basePath, { recursive: true, force: true });
  });

  it('should return only files with valid extensions (.html, .ts, .scss)', () => {
    const result = scanFiles(basePath);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/index\.html$/),
        expect.stringMatching(/main\.ts$/),
        expect.stringMatching(/style\.scss$/),
        expect.stringMatching(/component\.html$/),
        expect.stringMatching(/\.hidden\.ts$/),
      ]),
    );

    expect(result).not.toEqual(
      expect.arrayContaining([
        expect.stringMatching(/README\.md$/),
        expect.stringMatching(/config\.json$/),
        expect.stringMatching(/ignored\.txt$/),
      ]),
    );
  });

  it('should return full absolute paths', () => {
    const result = scanFiles(basePath);
    result.forEach((file) => {
      expect(path.isAbsolute(file)).toBe(true);
    });
  });

  it('should include files from nested directories', () => {
    const result = scanFiles(basePath);
    const hasNested = result.some((file) => file.includes(path.join('nested', 'component.html')));
    expect(hasNested).toBe(true);
  });
});
