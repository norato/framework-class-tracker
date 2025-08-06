import fs from 'fs';
import path from 'path';
import { extractClassesFromHtml, type ClassLocation } from '../parsers/htmlParser';

export interface ClassUsage extends ClassLocation {
  file: string;
}

type ParserFunction = (code: string) => ClassLocation[];

const extensionParsers: Record<string, ParserFunction> = {
  '.html': extractClassesFromHtml,
  // '.ts': extractClassesFromTs,
  // '.scss': extractClassesFromScss,
};

export function extractClassesFromFiles(filePaths: string[]): ClassUsage[] {
  const allClassUsages: ClassUsage[] = [];

  for (const file of filePaths) {
    const ext = path.extname(file);
    const parser = extensionParsers[ext];
    if (!parser) continue;

    const code = fs.readFileSync(file, 'utf-8');
    const classLocations = parser(code);

    for (const location of classLocations) {
      allClassUsages.push({ ...location, file });
    }
  }

  return allClassUsages;
}
