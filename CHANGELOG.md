# Changelog

## [1.1.0] - 2025-07-28

### ✨ New Features

- **Lint-style usage report:** the CLI now supports generating terminal-friendly output showing used CSS classes along with file paths and line numbers.
- **Clickable file references:** you can click the `path:line` output in supported terminals/editors to jump directly to the usage.
- **New helper function:** added `generateLintStyleReport()` to isolate the logic and make it easier to maintain or extend.

### 🔧 Technical Improvements

- Minor internal refactoring for better modularity.
- Preparation for supporting additional CSS frameworks beyond Bootstrap.

### 🧪 Best For

- Developers cleaning up unused CSS classes in large codebases.
- Teams migrating from Bootstrap to Tailwind or other styling strategies.
