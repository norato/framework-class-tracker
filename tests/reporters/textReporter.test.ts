import fs from 'fs';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { generateTextReport } from '../../src/reporters/textReporter';

describe('generateTextReport', () => {
  const outputPath = path.resolve(__dirname, '__fixtures__/report.txt');

  afterEach(() => {
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath);
    }
  });

  it('should generate a report with a dynamic title and framework classes', () => {
    generateTextReport(
      ['btn', 'btn-primary', 'd-block'],
      outputPath,
      'Utility classes'
    );

    const content = fs.readFileSync(outputPath, 'utf-8');

    expect(content).toContain('##### Utility classes #####');
    expect(content).toContain('btn');
    expect(content).toContain('btn-primary');
    expect(content).toContain('d-block');
  });
});
