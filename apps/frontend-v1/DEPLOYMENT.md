# TestConnect Frontend - Production Deployment Guide

This guide will help you deploy the TestConnect frontend application to AWS production environment.

## Prerequisites

1. **AWS CLI** installed and configured with appropriate credentials
2. **Node.js** (version 18 or higher)
3. **AWS Account** with appropriate permissions

## Quick Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AWS Credentials
```bash
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, default region (us-east-1), and output format.

### 3. Deploy to Production
```bash
npm run deploy
```

This will:
- Build your Next.js application
- Create an S3 bucket for static assets
- Create a CloudFront distribution
- Upload your application
- Output the CloudFront URL where your app is accessible

## What Gets Created

### **AWS Resources:**
- **S3 Bucket**: `test-connect-frontend-prod-assets` (for static assets)
- **CloudFront Distribution**: Global CDN for your application
- **Deployment Info**: Saved to `deployment-info.json`

### **Application URL:**
Your app will be available at: `https://[cloudfront-domain].cloudfront.net`

## Manual Deployment Steps

If you prefer to deploy manually:

### 1. Build the Application
```bash
npm run build
```

### 2. Create S3 Bucket
```bash
aws s3 mb s3://test-connect-frontend-prod-assets --region us-east-1
```

### 3. Configure S3 for Website Hosting
```bash
aws s3 website s3://test-connect-frontend-prod-assets --index-document index.html --error-document 404.html
```

### 4. Upload Static Assets
```bash
aws s3 sync .next/static s3://test-connect-frontend-prod-assets/_next/static --delete
aws s3 sync public s3://test-connect-frontend-prod-assets/public --delete
```

### 5. Create CloudFront Distribution
```bash
# This step requires creating a CloudFront distribution via AWS Console
# or using the AWS CLI with a JSON configuration file
```

## Monitoring

### View Deployment Information
After deployment, check `deployment-info.json` for:
- CloudFront domain name
- Distribution ID
- S3 bucket name
- Deployment date

### Check Application Status
```bash
# Get CloudFront distribution status
aws cloudfront get-distribution --id [DISTRIBUTION_ID]

# List S3 bucket contents
aws s3 ls s3://test-connect-frontend-prod-assets
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check for TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed: `npm install`

2. **AWS Credentials Error**
   - Verify credentials: `aws sts get-caller-identity`
   - Reconfigure: `aws configure`

3. **S3 Bucket Already Exists**
   - The script handles this automatically
   - If manual deployment, use a unique bucket name

4. **CloudFront Not Working**
   - Wait 10-15 minutes for distribution to deploy
   - Check distribution status in AWS Console

### Useful Commands

```bash
# Check AWS identity
aws sts get-caller-identity

# List S3 buckets
aws s3 ls

# Check CloudFront distributions
aws cloudfront list-distributions

# View deployment info
cat deployment-info.json
```

## Cost Estimation

Estimated monthly costs (US East region):
- **S3**: $1-3 (depending on storage)
- **CloudFront**: $1-5 (depending on traffic)
- **Data Transfer**: $0.09 per GB

**Total estimated cost: $2-8/month for moderate usage.**

## Security

### Built-in Security Features
1. **S3 Bucket**: Private with CloudFront access only
2. **CloudFront**: HTTPS only, security headers
3. **No Public Access**: S3 bucket blocks public access

### Best Practices
1. Regularly update dependencies
2. Monitor CloudFront access logs
3. Use AWS CloudTrail for audit logging
4. Implement proper authentication/authorization

## Performance

### Optimization Features
1. **Static Assets**: Served via CloudFront CDN
2. **Global Edge Locations**: Fast worldwide access
3. **Caching**: Optimized cache policies
4. **Compression**: Automatic gzip compression

## Next Steps

After successful deployment:
1. Test all application features
2. Set up monitoring and alerting
3. Configure custom domain (optional)
4. Set up CI/CD pipeline for automated deployments
5. Implement proper authentication and authorization

## Support

For deployment issues:
1. Check AWS CloudWatch logs
2. Review S3 bucket permissions
3. Verify CloudFront distribution status
4. Contact AWS support if needed
