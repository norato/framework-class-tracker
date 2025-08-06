import fs from 'fs';
import path from 'path';

export function generateTextReport(usedClasses: string[], outputPath: string, title = 'Framework classes'): void {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = [`##### ${title} #####`, ...usedClasses, ''].join('\n');

  fs.writeFileSync(outputPath, content, 'utf-8');
}
