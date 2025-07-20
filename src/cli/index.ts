#!/usr/bin/env node

import path from 'path';
import {
  extractClassesFromFramework,
  SupportedFramework,
} from '../analyzers/frameworkAnalyzer';
import { extractClassesFromFiles } from '../core/extractClassesFromFiles';
import { generateTextReport } from '../reporters/textReporter';
import { abort, getArgValue, logStep } from '../utils/cli-utils';
import { scanFiles } from '../utils/scanFiles';

const src = getArgValue('src');
const framework = (getArgValue('framework') ??
  'bootstrap') as SupportedFramework;
const frameworkPath = getArgValue('frameworkPath');

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
const matched = usedClasses.filter((cls) => frameworkClasses.has(cls));

logStep(`Generating report...`);

const reportPath = path.resolve(`framework-report.txt`);
generateTextReport(matched, reportPath, `${framework} classes`);

logStep(`Done! Found ${matched.length} used ${framework} classes.`);
logStep(`Report generated at: ${reportPath}`);
