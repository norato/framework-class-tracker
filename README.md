# framework-class-tracker

A CLI tool to scan your project files and identify which CSS classes from a specific framework (currently Bootstrap) are actually in use. It can generate a simple text report or a lint-style output to help you track class usage and optimize your CSS.

## ✅ Features

- Parse files in a given `--src` directory to detect used class names.
- Compare used classes against the selected framework (default: Bootstrap).
- Supports custom `--frameworkPath` for CSS source.
- **Two report types**: a simple `.txt` file or a `lint-style` terminal output.
- CLI-friendly with clear error messages and output logs.

## 📦 Installation

```bash
npm install -g framework-class-tracker
# or
pnpm add -g framework-class-tracker
```

To use in a local project:

```bash
pnpm add -D framework-class-tracker
```

## 🚀 Usage

By default, the tool generates a `framework-report.txt` file:

```bash
framework-class-tracker --src=./src
```

### Lint-Style Report

To get a lint-style output in your terminal, use the `--reporter=lint` flag:

```bash
framework-class-tracker --src=./src --reporter=lint
```

This will print a list of all used classes, grouped by class name, with the file and line number where each class is used. This is useful for quickly finding where a class is being used in your project.

Example output:

```
Class: btn
  src/components/Button.ts:10 - class: btn
  src/pages/Home.ts:42 - class: btn

Class: btn-primary
  src/components/Button.ts:10 - class: btn-primary
```

### Screenshot

![Framework Class Tracker Output](./example.jpeg)

### Using Materialize Framework

To analyze Materialize CSS classes instead of Bootstrap:

```bash
framework-class-tracker --src=./src --framework=materialize
```

### Custom CSS Source

You can also specify the CSS source manually:

```bash
framework-class-tracker --src=./src --frameworkPath=./node_modules/bootstrap/dist/css
```

## 🧠 How it works

1. Scans all supported source files recursively inside the `--src` folder.
2. Extracts class names and their locations (file and line number).
3. Loads and parses the target framework's CSS files.
4. Compares the class names found with those available in the framework.
5. Generates a report in the specified format (`text` or `lint`).

## 🛠 Supported frameworks

Currently supported:

- `bootstrap` (default)
- `materialize`

More to come (planned):

- `tailwindcss`
- `bulma`
- `foundation`

## ✨ Coming soon

- Support for multiple frameworks in a single scan
- JSON/CSV output formats
- Filtering by component or screen

## 🧪 Development

Clone and run locally:

```bash
pnpm install
```

To build the project:

```bash
pnpm build
```

To test locally in another project, you can use the `link` script. It will build the project and create a global symlink so you can run the command in any directory.

```bash
pnpm run link

# Then, in another repository:
framework-class-tracker --src=./src --reporter=lint
```

Run tests:

```bash
pnpm test
```

## 📄 License

MIT
