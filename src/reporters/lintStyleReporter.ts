import type { ClassUsage } from '../core/extractClassesFromFiles';
import { bold, gray, yellow } from '../utils/colors';
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
${yellow('Class:')} ${bold(className)}`);
    for (const usage of groupedByClass[className]) {
      const location = gray(`${usage.file}:${usage.line}`);
      const label = yellow(`class: ${usage.className}`);
      console.log(`  ${location} - ${label}`);
    }
  }
}
