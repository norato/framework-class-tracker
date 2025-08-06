import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { extractFrameworkClassesFromCss } from '../../src/analyzers/extractFrameworkClassesFromCss';

describe('extractFrameworkClassesFromCss', () => {
  const cssPath = path.resolve(__dirname, '__fixtures__/mock-framework.css');

  beforeAll(() => {
    const mockCss = `
      .btn { color: red; }
      .btn-primary:hover { background: blue; }
      .d-block, .mt-2 { display: block; }
      .col-12[class] { width: 100%; }
    `;
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, mockCss);
  });

  afterAll(() => {
    fs.rmSync(path.dirname(cssPath), { recursive: true, force: true });
  });

  it('should extract all unique class names from CSS content', () => {
    const result = extractFrameworkClassesFromCss(cssPath);

    expect(result).toEqual(new Set(['btn', 'btn-primary', 'd-block', 'mt-2', 'col-12']));
  });

  it('should throw an error if the CSS file does not exist', () => {
    expect(() => extractFrameworkClassesFromCss('non-existent.css')).toThrow(/CSS file not found/);
  });
});
