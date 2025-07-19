import { describe, expect, it } from 'vitest';
import { extractClassesFromHtml } from '../src/parsers/htmlParser';

describe('extractClassesFromHtml', () => {
  it('should extract multiple classes from class attribute', () => {
    const html = `<div class="btn btn-primary  text-muted"></div>`;
    const result = extractClassesFromHtml(html);
    expect(result).toEqual(['btn', 'btn-primary', 'text-muted']);
  });

  it('should handle single class', () => {
    const html = `<div class="container"></div>`;
    expect(extractClassesFromHtml(html)).toEqual(['container']);
  });

  it('should ignore tags without class attribute', () => {
    const html = `<div>No class here</div>`;
    expect(extractClassesFromHtml(html)).toEqual([]);
  });

  it('should ignore empty class attributes', () => {
    const html = `<div class=""></div>`;
    expect(extractClassesFromHtml(html)).toEqual([]);
  });
  it('should extract all classes from class attributes', () => {
    const html = `
      <div class="btn btn-primary"></div>
      <span class="text-muted  d-block"></span>
      <p>No class here</p>
    `;
    const result = extractClassesFromHtml(html);

    expect(result).toEqual(['btn', 'btn-primary', 'text-muted', 'd-block']);
  });
});
