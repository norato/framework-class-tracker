import fs from 'fs';

export function extractFrameworkClassesFromCss(cssPath: string): Set<string> {
  if (!fs.existsSync(cssPath)) {
    throw new Error(`CSS file not found at path: ${cssPath}`);
  }

  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  // Match patterns like `.btn`, `.d-block`, `.col-12`
  const classRegex = /\.([a-zA-Z0-9_-]+)/g;

  const classes = new Set<string>();
  let match;

  while ((match = classRegex.exec(cssContent))) {
    classes.add(match[1]);
  }

  return classes;
}
