# Changelog

## [1.2.0] - 2025-08-06

### ✨ New Features

- **Materialize CSS Support:** Added support for Materialize CSS framework analysis alongside Bootstrap
- **Multi-framework flexibility:** Can now track classes from multiple CSS frameworks with the `--framework` option
- **Test fixtures:** Added Materialize HTML test fixture for framework validation

### 🔧 Technical Improvements

- Extended `SupportedFramework` type to include 'materialize' option
- Added Materialize CSS package to dependencies for local resolution
- Updated framework path resolution to handle Materialize CSS files
- Enhanced documentation with Materialize usage examples

### 📚 Documentation

- Updated README with Materialize framework usage instructions
- Added Materialize to keywords for better discoverability

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
