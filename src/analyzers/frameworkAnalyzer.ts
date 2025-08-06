import fs from 'fs';
import path from 'path';
import { extractFrameworkClassesFromCss } from './extractFrameworkClassesFromCss';

export type SupportedFramework = 'bootstrap' | 'materialize';
// | 'tailwind';

export function extractClassesFromFramework(options: {
  framework: SupportedFramework;
  frameworkPath?: string;
}): Set<string> {
  const { framework, frameworkPath } = options;

  const resolvedPaths = resolveFrameworkPaths(framework, frameworkPath);

  const combined = new Set<string>();

  for (const filePath of resolvedPaths) {
    const classes = extractFrameworkClassesFromCss(filePath);
    classes.forEach((cls) => combined.add(cls));
  }

  return combined;
}

function resolveFrameworkPaths(framework: string, customPath?: string): string[] {
  if (customPath) {
    const absolutePath = path.resolve(process.cwd(), customPath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Framework path not found: ${absolutePath}`);
    }

    const stats = fs.statSync(absolutePath);
    if (stats.isFile() && absolutePath.endsWith('.css')) {
      return [absolutePath];
    }

    if (stats.isDirectory()) {
      return fs
        .readdirSync(absolutePath)
        .filter((file) => file.endsWith('.css'))
        .map((file) => path.join(absolutePath, file));
    }

    throw new Error(`Invalid framework path: must be a CSS file or a directory with CSS files`);
  }

  switch (framework) {
    case 'bootstrap':
      return [path.resolve('node_modules/bootstrap/dist/css/bootstrap.min.css')];
    case 'materialize':
      return [path.resolve('node_modules/materialize-css/dist/css/materialize.min.css')];
    // case 'tailwind':
    //   return [path.resolve('node_modules/tailwindcss/tailwind.css')];
    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }
}
