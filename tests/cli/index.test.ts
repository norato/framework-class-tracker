import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as analyzer from '../../src/analyzers/frameworkAnalyzer';
import * as extract from '../../src/core/extractClassesFromFiles';
import * as reporter from '../../src/reporters/textReporter';
import * as scan from '../../src/utils/scanFiles';

vi.mock('../../src/utils/scanFiles', () => ({
  scanFiles: vi.fn(() => ['file1.html']),
}));

vi.mock('../../src/core/extractClassesFromFiles', () => ({
  extractClassesFromFiles: vi.fn(() => [
    { className: 'btn', file: 'file1.html', line: 1 },
    { className: 'mt-2', file: 'file1.html', line: 2 },
  ]),
}));

vi.mock('../../src/analyzers/frameworkAnalyzer', () => ({
  extractClassesFromFramework: vi.fn(() => new Set(['btn', 'mt-2'])),
}));

vi.mock('../../src/reporters/textReporter', () => ({
  generateTextReport: vi.fn(),
}));

describe('CLI', () => {
  const originalArgv = process.argv;
  const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
    throw new Error('process.exit'); // impede que o teste finalize
  });
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  it('should call all internal modules with correct arguments', async () => {
    process.argv = ['node', 'cli.js', '--src=tests/fixtures/sample-html', '--framework=bootstrap'];

    await import('../../src/cli/index');

    expect(scan.scanFiles).toHaveBeenCalledWith(expect.stringContaining('sample-html'));
    expect(extract.extractClassesFromFiles).toHaveBeenCalledWith(['file1.html']);
    expect(analyzer.extractClassesFromFramework).toHaveBeenCalledWith({
      framework: 'bootstrap',
    });
    expect(reporter.generateTextReport).toHaveBeenCalledWith(
      ['btn', 'mt-2'],
      expect.stringContaining('framework-report.txt'),
      'bootstrap classes',
    );
  });

  it('should exit with error if arguments are missing', async () => {
    process.argv = ['node', 'cli.js', '--framework=bootstrap'];

    await expect(import('../../src/cli/index')).rejects.toThrow('process.exit');

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Missing --src argument'));
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(scan.scanFiles).not.toHaveBeenCalled();
    expect(extract.extractClassesFromFiles).not.toHaveBeenCalled();
    expect(reporter.generateTextReport).not.toHaveBeenCalled();
  });

  it('should default to bootstrap if --framework is not provided', async () => {
    process.argv = ['node', 'cli.js', '--src=tests/fixtures/sample-html'];

    await import('../../src/cli/index');

    expect(analyzer.extractClassesFromFramework).toHaveBeenCalledWith({
      framework: 'bootstrap',
    });
  });
});
