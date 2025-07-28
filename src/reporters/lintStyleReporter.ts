import type { ClassUsage } from '../core/extractClassesFromFiles';

export function generateLintStyleReport(allClasses: ClassUsage[]): void {
  const groupedByClass: Record<string, ClassUsage[]> = {};

  for (const classUsage of allClasses) {
    if (!groupedByClass[classUsage.className]) {
      groupedByClass[classUsage.className] = [];
    }
    groupedByClass[classUsage.className].push(classUsage);
  }

  for (const className in groupedByClass) {
    console.log(`
Class: ${className}`);
    for (const usage of groupedByClass[className]) {
      console.log(`  ${usage.file}:${usage.line} - class: ${usage.className}`);
    }
  }
}
