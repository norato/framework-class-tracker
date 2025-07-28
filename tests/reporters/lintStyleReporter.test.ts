import { describe, expect, it, vi } from 'vitest';
import type { ClassUsage } from '../../src/core/extractClassesFromFiles';
import { generateLintStyleReport } from '../../src/reporters/lintStyleReporter';

describe('generateLintStyleReport', () => {
  it('should log classes grouped by className', () => {
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    const usages: ClassUsage[] = [
      { className: 'btn', file: 'src/components/Button.ts', line: 10 },
      { className: 'btn-primary', file: 'src/components/Button.ts', line: 10 },
      { className: 'btn', file: 'src/pages/Home.ts', line: 42 },
    ];

    generateLintStyleReport(usages);

    expect(consoleMock).toHaveBeenCalledWith('\nClass: btn');
    expect(consoleMock).toHaveBeenCalledWith(
      '  src/components/Button.ts:10 - class: btn'
    );
    expect(consoleMock).toHaveBeenCalledWith('  src/pages/Home.ts:42 - class: btn');

    expect(consoleMock).toHaveBeenCalledWith('\nClass: btn-primary');
    expect(consoleMock).toHaveBeenCalledWith(
      '  src/components/Button.ts:10 - class: btn-primary'
    );

    consoleMock.mockRestore();
  });
});
