import fs from 'fs';
import path from 'path';

const VALID_EXTENSIONS = ['.html', '.ts', '.scss'];

export function scanFiles(dir: string): string[] {
  const result: string[] = [];

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (VALID_EXTENSIONS.includes(path.extname(entry.name))) {
        result.push(fullPath);
      }
    }
  }
  walk(dir);
  return result;
}
