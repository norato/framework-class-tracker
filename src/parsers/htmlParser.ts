export function extractClassesFromHtml(html: string): string[] {
  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  const classes: string[] = [];

  let match;
  while ((match = classRegex.exec(html))) {
    const raw = match[1].trim();
    const split = raw.split(/\s+/);
    classes.push(...split);
  }

  return classes;
}
