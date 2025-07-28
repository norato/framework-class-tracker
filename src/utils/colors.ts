/* eslint-disable no-unused-vars */

// Basic ANSI color codes
enum AnsiColors {
  Reset = '\x1b[0m',
  Bold = '\x1b[1m',
  Dim = '\x1b[2m',
  Yellow = '\x1b[33m',
  Gray = '\x1b[90m',
}

function colorize(color: AnsiColors, text: string): string {
  return `${color}${text}${AnsiColors.Reset}`;
}

export const yellow = (text: string) => colorize(AnsiColors.Yellow, text);
export const gray = (text: string) => colorize(AnsiColors.Gray, text);
export const bold = (text: string) => colorize(AnsiColors.Bold, text);
