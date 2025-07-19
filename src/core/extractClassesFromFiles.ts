import fs from 'fs';
import path from 'path';
import { extractClassesFromHtml } from '../parsers/htmlParser';

type ParserFunction = (code: string) => string[];

const extensionParsers: Record<string, ParserFunction> = {
  '.html': extractClassesFromHtml,
  // '.ts': extractClassesFromTs,
  // '.scss': extractClassesFromScss,
};

export function extractClassesFromFiles(filePaths: string[]): string[] {
  const allClasses = new Set<string>();

  for (const file of filePaths) {
    const ext = path.extname(file);
    const parser = extensionParsers[ext];
    if (!parser) continue;

    const code = fs.readFileSync(file, 'utf-8');
    const classes = parser(code);
    classes.forEach((cls) => allClasses.add(cls));
  }

  return Array.from(allClasses).sort();
}
