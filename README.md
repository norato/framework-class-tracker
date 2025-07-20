# framework-class-tracker

A CLI tool to scan your project files and identify which CSS classes from a specific framework (currently Bootstrap) are actually in use. Generates a text report of used utility classes to help reduce unused styles and optimize performance.

## ✅ Features

- Parse files in a given `--src` directory to detect used class names
- Compare used classes against the selected framework (default: Bootstrap)
- Supports custom `--frameworkPath` for CSS source
- Outputs a `.txt` report listing all matched classes
- CLI-friendly with clear error messages and output logs

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

```bash
framework-class-tracker --src=./src
```

You can also specify the CSS source manually:

```bash
framework-class-tracker --src=./src --frameworkPath=./node_modules/bootstrap/dist/css
```

This will scan your project files under `./src`, extract class names, compare them to the classes from the CSS files provided, and generate a report file like:

```
##### bootstrap classes #####
btn
btn-primary
d-flex
mt-3
...
```

The report is saved as `framework-report.txt` in the root directory.

## 🧠 How it works

1. Scans all supported source files recursively inside the `--src` folder.
2. Extracts class names using a pluggable parser per file type.
3. Loads and parses the target framework's CSS files.
4. Compares the class names found with those available in the framework.
5. Generates a clean `.txt` file listing only the matched ones.

## 🛠 Supported frameworks

Currently supported:

- `bootstrap` (default)

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
pnpm dev
```

To test locally in another project:

```bash
pnpm build
npm link
# Then run in another repo:
framework-class-tracker --src=./src
```

Run tests:

```bash
pnpm test
```

## 📄 License

MIT
