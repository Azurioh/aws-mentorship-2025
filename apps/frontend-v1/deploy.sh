#!/usr/bin/env bash
set -euo pipefail

echo "📦 Building SPA..."
npm run build

echo "✅ Build complete. Serve 'dist' on any static host (S3/CloudFront, Netlify, Vercel static)."
