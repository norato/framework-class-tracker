import { describe, expect, it } from 'vitest';
import { extractClassesFromHtml } from '../../src/parsers/htmlParser';

describe('extractClassesFromHtml', () => {
  it('should extract classes with line numbers', () => {
    const html = '\n<div class="btn btn-primary"></div>\n<span class="text-muted"></span>';
    const result = extractClassesFromHtml(html);
    expect(result).toEqual([
      { className: 'btn', line: 2 },
      { className: 'btn-primary', line: 2 },
      { className: 'text-muted', line: 3 },
    ]);
  });

  it('should handle multiple classes on the same line', () => {
    const html = '<div class="container  d-flex"></div>';
    const result = extractClassesFromHtml(html);
    expect(result).toEqual([
      { className: 'container', line: 1 },
      { className: 'd-flex', line: 1 },
    ]);
  });

  it('should return an empty array for no classes', () => {
    const html = '<div></div>';
    const result = extractClassesFromHtml(html);
    expect(result).toEqual([]);
  });
});
