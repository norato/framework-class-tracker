import { describe, expect, it } from 'vitest';
import { extractClassesFromFramework } from '../../src/analyzers/frameworkAnalyzer';

describe('extractClassesFromFramework', () => {
  it('should extract classes from bootstrap installed via node_modules', () => {
    const result = extractClassesFromFramework({ framework: 'bootstrap' });

    expect(result.has('btn')).toBe(true);
    expect(result.has('container')).toBe(true);
    expect(result.has('row')).toBe(true);
  });

  it('should throw if framework is not supported', () => {
    expect(() =>
      extractClassesFromFramework({ framework: 'bulma' as any })
    ).toThrow(/Unsupported framework/);
  });
});
