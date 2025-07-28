export interface ClassLocation {
  className: string;
  line: number;
}

export function extractClassesFromHtml(html: string): ClassLocation[] {
  const lines = html.split('\n');
  const classLocations: ClassLocation[] = [];

  lines.forEach((line, index) => {
    const classRegex = /class\s*=\s*["']([^"']+)["']/g;
    let match;
    while ((match = classRegex.exec(line))) {
      const rawClasses = match[1].trim();
      const splitClasses = rawClasses.split(/\s+/);
      for (const className of splitClasses) {
        if (className) {
          classLocations.push({ className, line: index + 1 });
        }
      }
    }
  });

  return classLocations;
}
