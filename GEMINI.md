# Gemini Project Directives: framework-class-tracker

This document contains project-specific settings, conventions, and workflow instructions to ensure consistent and efficient development.

## 1. Project Overview

This is a CLI tool built with TypeScript that scans a project's source code to identify and report on the usage of CSS framework classes (like Bootstrap). It offers multiple report formats, including a text file and a colorized, lint-style output in the terminal.

## 2. Key Technologies

- **Language**: TypeScript
- **Runtime**: Node.js
- **Package Manager**: pnpm
- **Build Tool**: tsup
- **Test Runner**: Vitest

## 3. Development Workflow

- **Install Dependencies**: `pnpm install`
- **Run Tests**: `pnpm test` (This runs all tests with coverage).
- **Build for Production**: `pnpm build` (Compiles TypeScript from `src/` to JavaScript in `dist/`).
- **Local Development & Testing**: `pnpm run link` (This custom script builds the project and runs `pnpm link --global` to make the CLI command globally available for testing in other local projects).

## 4. Architecture and Code Conventions

- **`src/cli/index.ts`**: The main entry point for the CLI. It handles argument parsing and orchestrates the analysis pipeline.
- **`src/core/`**: Contains the core logic for extracting class usage data from files.
- **`src/parsers/`**: Holds file-type-specific parsers (e.g., `htmlParser.ts`) that extract class names and line numbers from code.
- **`src/analyzers/`**: Manages framework-specific logic, like loading all available classes from a framework's CSS files.
- **`src/reporters/`**: Formats the results for output. It supports multiple reporter types (`textReporter`, `lintStyleReporter`).
- **`src/utils/`**: Contains shared utility functions. We prefer lightweight, custom utilities (e.g., `colors.ts`) over adding new dependencies for simple tasks.
- **Tests**: The `tests/` directory mirrors the `src/` structure. New features or changes should be accompanied by corresponding tests.
- **Dependencies**: Keep external dependencies to a minimum.
