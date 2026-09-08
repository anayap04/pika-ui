#!/bin/bash

# Release script for Pika UI
# Usage: ./scripts/release.sh v0.1.0

set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/release.sh <version>"
  echo "Example: ./scripts/release.sh v0.2.0"
  exit 1
fi

VERSION=$1

# Validate version format
if ! [[ $VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+ ]]; then
  echo "Error: Version must match the pattern v0.0.0"
  exit 1
fi

# Remove 'v' prefix for package.json
PKG_VERSION=${VERSION#v}

echo "📦 Releasing Pika UI $VERSION"
echo ""

# Check git status
if ! git diff-index --quiet HEAD --; then
  echo "❌ Working tree is not clean. Commit all changes first."
  exit 1
fi

# Update package.json version
echo "📝 Updating package.json..."
npm version "$PKG_VERSION" --no-git-tag-v

# Run full build pipeline
echo "🔨 Building..."
npm run build

# Verify builds completed
if [ ! -d "dist" ]; then
  echo "❌ Build failed - dist directory not found"
  exit 1
fi

echo "✅ Build successful"
echo ""

# Create git tag
echo "🏷️  Creating git tag $VERSION..."
git tag "$VERSION"

echo "🚀 Ready to push!"
echo ""
echo "Run the following commands to complete the release:"
echo ""
echo "  git push origin main"
echo "  git push origin $VERSION"
echo ""
echo "Once pushed, GitHub Actions will automatically:"
echo "  1. Run tests and linting"
echo "  2. Build the library"
echo "  3. Publish to NPM"
echo "  4. Create a GitHub release"
