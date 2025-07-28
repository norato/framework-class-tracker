import { describe, expect, it, vi } from 'vitest';
import type { ClassUsage } from '../../src/core/extractClassesFromFiles';
import { generateLintStyleReport } from '../../src/reporters/lintStyleReporter';
import { bold, gray, yellow } from '../../src/utils/colors';

describe('generateLintStyleReport', () => {
  it('should log classes with colors', () => {
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    const usages: ClassUsage[] = [
      { className: 'btn', file: 'src/Button.ts', line: 10 },
      { className: 'btn-primary', file: 'src/Button.ts', line: 10 },
    ];

    generateLintStyleReport(usages);

    expect(consoleMock).toHaveBeenCalledWith(`\n${yellow('Class:')} ${bold('btn')}`);
    expect(consoleMock).toHaveBeenCalledWith(
      `  ${gray('src/Button.ts:10')} - ${yellow('class: btn')}`
    );

    consoleMock.mockRestore();
  });
});
