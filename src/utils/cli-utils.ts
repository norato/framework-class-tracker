export function getArgValue(name: string): string | undefined {
  return process.argv
    .find((arg) => arg.startsWith(`--${name}=`))
    ?.split('=')[1];
}

export function logStep(message: string) {
  console.log(`\x1b[36m[tracker]\x1b[0m ${message}`);
}

export function abort(message: string) {
  console.error(`\x1b[31m[tracker error]\x1b[0m ${message}`);
  process.exit(1);
}
