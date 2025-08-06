import fs from 'fs';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { generateTextReport } from '../../src/reporters/textReporter';

const basePath = path.join(__dirname, '__temp__');

describe('generateTextReport', () => {
  const outputPath = path.resolve(__dirname, '__fixtures__/report.txt');

  afterEach(() => {
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath);
    }
  });

  it('should generate a report with a dynamic title and framework classes', () => {
    generateTextReport(['btn', 'btn-primary', 'd-block'], outputPath, 'Utility classes');

    const content = fs.readFileSync(outputPath, 'utf-8');

    expect(content).toContain('##### Utility classes #####');
    expect(content).toContain('btn');
    expect(content).toContain('btn-primary');
    expect(content).toContain('d-block');
  });

  it('should create the directory if it does not exist', () => {
    const tempDir = path.join(basePath, 'new-folder');
    const reportPath = path.join(tempDir, 'report.txt');

    generateTextReport(['class-a', 'class-b'], reportPath, 'Test Report');

    expect(fs.existsSync(reportPath)).toBe(true);
  });

  it('should create the directory if it does not exist', () => {
    const customDir = path.join(basePath, 'non-existent-folder');
    const outputPath = path.join(customDir, 'report.txt');

    if (fs.existsSync(customDir)) fs.rmSync(customDir, { recursive: true });

    generateTextReport(['custom-class'], outputPath, 'Title');

    const content = fs.readFileSync(outputPath, 'utf-8');

    expect(fs.existsSync(outputPath)).toBe(true);
    expect(content).toContain('custom-class');
  });
});
