#!/bin/bash

# TestConnect Frontend - Production Deployment Script
# This script deploys the Next.js application to AWS using Serverless Framework

set -e

echo "🚀 Starting TestConnect Frontend deployment..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials are not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if serverless is installed
if ! command -v serverless &> /dev/null; then
    echo "❌ Serverless Framework is not installed. Please install it first: npm install -g serverless"
    exit 1
fi

# Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the build errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy using Serverless Framework
echo "🚀 Deploying with Serverless Framework..."
serverless deploy --stage prod --verbose

if [ $? -ne 0 ]; then
    echo "❌ Serverless deployment failed."
    exit 1
fi

echo "✅ Serverless deployment completed!"

# Get deployment information
echo "📊 Getting deployment information..."
DEPLOYMENT_INFO=$(serverless info --stage prod --verbose)

# Extract the CloudFront URL from the deployment info
CLOUDFRONT_URL=$(echo "$DEPLOYMENT_INFO" | grep "CloudFrontUrl:" | awk '{print $2}')
API_URL=$(echo "$DEPLOYMENT_INFO" | grep "ServiceEndpoint:" | awk '{print $2}')

echo "🎉 Deployment completed successfully!"
echo "🌐 Your application is available at: $CLOUDFRONT_URL"
echo "🔗 API Gateway URL: $API_URL"

# Save deployment info
cat > deployment-info.json <<EOF
{
  "deploymentDate": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "cloudfrontUrl": "$CLOUDFRONT_URL",
  "apiUrl": "$API_URL",
  "stage": "prod",
  "region": "$(aws configure get region)"
}
EOF

echo "📄 Deployment information saved to deployment-info.json"
echo ""
echo "🔧 To remove the deployment, run: serverless remove --stage prod"
echo "📋 To view logs, run: serverless logs --stage prod"
