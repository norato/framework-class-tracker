import path from 'path';
import { describe, expect, it } from 'vitest';
import { extractClassesFromFramework } from '../../src/analyzers/frameworkAnalyzer';

const fixtureDir = path.resolve(__dirname, '../../fixtures/css');

const cssFile = path.join(fixtureDir, 'single.css');
const cssDir = path.join(fixtureDir, 'multi');

describe('extractClassesFromFramework', () => {
  it('should extract classes from bootstrap installed via node_modules', () => {
    const result = extractClassesFromFramework({ framework: 'bootstrap' });

    expect(result.has('btn')).toBe(true);
    expect(result.has('container')).toBe(true);
    expect(result.has('row')).toBe(true);
  });

  it('should throw if framework is not supported', () => {
    expect(() => extractClassesFromFramework({ framework: 'bulma' as any })).toThrow(/Unsupported framework/);
  });

  it('should extract classes from a provided CSS file', () => {
    const result = extractClassesFromFramework({
      framework: 'bootstrap',
      frameworkPath: cssFile,
    });

    expect(result.has('custom-class')).toBe(true);
    expect(result.has('another-class')).toBe(true);
  });

  it('should extract classes from a directory of CSS files', () => {
    const result = extractClassesFromFramework({
      framework: 'bootstrap',
      frameworkPath: cssDir,
    });

    expect(result.has('from-file-one')).toBe(true);
    expect(result.has('from-file-two')).toBe(true);
  });

  it('should throw if path does not exist', () => {
    expect(() =>
      extractClassesFromFramework({
        framework: 'bootstrap',
        frameworkPath: './fake/path/to/css',
      }),
    ).toThrow(/Framework path not found/);
  });

  it('should throw if path is neither file nor folder', () => {
    const invalidTxt = path.resolve(__dirname, '../../fixtures/invalid.txt');

    expect(() =>
      extractClassesFromFramework({
        framework: 'bootstrap',
        frameworkPath: invalidTxt,
      }),
    ).toThrow(/Invalid framework path/);
  });
});
