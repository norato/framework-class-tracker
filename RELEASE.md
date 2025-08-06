# Release Process

This project uses GitHub Actions to automatically publish to npm when a version tag is pushed.

## Prerequisites

1. Make sure you have set up the `NPM_TOKEN` secret in your GitHub repository settings:
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm authentication token (get it from npm.com → Account Settings → Access Tokens)

## How to Release

### Option 1: Using Release Scripts (Recommended)

```bash
# For patch release (1.2.0 → 1.2.1)
pnpm release:patch

# For minor release (1.2.0 → 1.3.0)
pnpm release:minor

# For major release (1.2.0 → 2.0.0)
pnpm release:major
```

These scripts will automatically:
1. Run tests (via `preversion` hook)
2. Build the project
3. Update the version in package.json
4. Create a git commit with the version change
5. Create a git tag (e.g., `v1.3.0`)
6. Push both the commit and tag to GitHub (via `postversion` hook)
7. Trigger the GitHub Actions workflow for npm publishing

### Option 2: Manual Process

1. Update the version in `package.json`
2. Update `CHANGELOG.md` with the new version details
3. Commit your changes:
   ```bash
   git add .
   git commit -m "chore: release version X.Y.Z"
   ```
4. Create and push a tag:
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

## What Happens Next

Once you push a tag:
1. GitHub Actions will automatically:
   - Run tests on Node.js 18 and 20
   - Build the project
   - Verify the tag version matches package.json
   - Publish to npm
   - Create a GitHub Release with changelog

## Workflow Files

- `.github/workflows/npm-publish.yml` - Handles npm publishing on version tags
- `.github/workflows/ci.yml` - Runs tests on every push and PR

## Best Practices

1. Always update `CHANGELOG.md` before releasing
2. Make sure all tests pass locally before releasing
3. Use semantic versioning:
   - PATCH: Bug fixes (1.2.0 → 1.2.1)
   - MINOR: New features, backwards compatible (1.2.0 → 1.3.0)
   - MAJOR: Breaking changes (1.2.0 → 2.0.0)
4. Create releases from the `main` branch only