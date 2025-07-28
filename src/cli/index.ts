#!/usr/bin/env node

import path from 'path';
import {
  extractClassesFromFramework,
  SupportedFramework,
} from '../analyzers/frameworkAnalyzer';
import { extractClassesFromFiles } from '../core/extractClassesFromFiles';
import { generateLintStyleReport } from '../reporters/lintStyleReporter';
import { generateTextReport } from '../reporters/textReporter';
import { abort, getArgValue, logStep } from '../utils/cli-utils';
import { scanFiles } from '../utils/scanFiles';

const src = getArgValue('src');
const framework = (getArgValue('framework') ??
  'bootstrap') as SupportedFramework;
const frameworkPath = getArgValue('frameworkPath');
const reporter = getArgValue('reporter') ?? 'text';

if (!src) {
  abort('Missing --src argument');
}

logStep(`Scanning files from: ${src}`);
const files = scanFiles(path.resolve(src!));

logStep(`Extracting used classes...`);
const usedClasses = extractClassesFromFiles(files);

logStep(`Loading ${framework} framework classes...`);
const frameworkClasses = extractClassesFromFramework({
  framework,
  frameworkPath,
});

logStep(`Matching used classes against framework classes...`);
const matchedClasses = usedClasses.filter((cls) =>
  frameworkClasses.has(cls.className)
);

logStep(`Generating report...`);

if (reporter === 'lint') {
  generateLintStyleReport(matchedClasses);
} else {
  const reportPath = path.resolve(`framework-report.txt`);
  const classNames = matchedClasses.map((cls) => cls.className);
  generateTextReport(classNames, reportPath, `${framework} classes`);
  logStep(`Report generated at: ${reportPath}`);
}

logStep(`Done! Found ${matchedClasses.length} used ${framework} classes.`);
