#!/usr/bin/env node

import path from 'path';
import {
  extractClassesFromFramework,
  SupportedFramework,
} from '../analyzers/frameworkAnalyzer';
import { extractClassesFromFiles } from '../core/extractClassesFromFiles';
import { generateTextReport } from '../reporters/textReporter';
import { scanFiles } from '../utils/scanFiles';

const args = process.argv.slice(2);
const srcArg = args.find((arg) => arg.startsWith('--src='));
const frameworkArg = args.find((arg) => arg.startsWith('--framework='));
const framework: SupportedFramework = frameworkArg
  ? (frameworkArg.replace('--framework=', '') as SupportedFramework)
  : 'bootstrap';

if (!srcArg) {
  console.error('Missing --src argument');
  process.exit(1);
}

const src = srcArg.replace('--src=', '');

const files = scanFiles(path.resolve(src));
const usedClasses = extractClassesFromFiles(files);
const frameworkClasses = extractClassesFromFramework({ framework });

const matched = usedClasses.filter((cls) => frameworkClasses.has(cls));

generateTextReport(matched, 'framework-report.txt', `${framework} classes`);
