#!/bin/bash
# Build script for Render deployment

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Build complete!"
