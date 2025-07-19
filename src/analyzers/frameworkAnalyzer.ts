import path from 'path';
import { extractFrameworkClassesFromCss } from './extractFrameworkClassesFromCss';

export function extractClassesFromFramework(options: {
  framework: 'bootstrap' | 'tailwind';
  cssPath?: string;
}): Set<string> {
  const { framework, cssPath } = options;

  const resolvedCssPath = cssPath ?? resolveCssPathFromNodeModules(framework);

  return extractFrameworkClassesFromCss(resolvedCssPath);
}

function resolveCssPathFromNodeModules(framework: string): string {
  switch (framework) {
    case 'bootstrap':
      return path.resolve('node_modules/bootstrap/dist/css/bootstrap.min.css');
    case 'tailwind':
      return path.resolve('node_modules/tailwindcss/tailwind.css');
    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }
}
