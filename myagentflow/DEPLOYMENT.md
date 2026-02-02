# AgentFlow Deployment Guide

## Production Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables set for production
- [ ] Security settings configured
- [ ] Logging and monitoring enabled
- [ ] Backup strategy implemented
- [ ] SSL/HTTPS enabled
- [ ] Domain configured
- [ ] Error tracking setup (Sentry)
- [ ] Performance monitoring setup
- [ ] API documentation deployed

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

#### 1.1 Prerequisites

- GitHub account with repository
- Vercel account (free tier available)
- MongoDB Atlas cluster

#### 1.2 Setup Repository

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: AgentFlow with MongoDB"
git branch -M main
git remote add origin https://github.com/your-username/agentflow.git
git push -u origin main
```

#### 1.3 Deploy to Vercel

1. Go to https://vercel.com/import
2. Select your GitHub repository
3. Click "Import"
4. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `COHERE_API_KEY` - Your Cohere API key
   - `JWT_SECRET` - Strong random string
   - `SESSION_SECRET` - Strong random string
   - `NODE_ENV` - Set to `production`

5. Click "Deploy"

#### 1.4 Custom Domain (Optional)

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed

### Option 2: Docker + AWS/GCP/Azure

#### 2.1 Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

#### 2.2 Create Docker Compose (Local Testing)

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: mongodb://mongo:27017/agentflow
      COHERE_API_KEY: ${COHERE_API_KEY}
      NODE_ENV: production

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

#### 2.3 Build and Test

```bash
docker-compose up --build
# Test at http://localhost:3000
```

#### 2.4 Deploy to AWS

```bash
# Using AWS ECR and ECS
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker tag agentflow:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/agentflow:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/agentflow:latest

# Configure ECS task definition and service
```

### Option 3: Traditional VPS/Dedicated Server

#### 3.1 Server Setup (Ubuntu 20.04+)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB (or use Atlas)
sudo apt install -y mongodb-server

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2

# Install SSL certificates
sudo apt install -y certbot python3-certbot-nginx
```

#### 3.2 Configure Application

```bash
# Clone repository
git clone https://github.com/your-username/agentflow.git
cd agentflow

# Install dependencies
npm install

# Build production
npm run build

# Start with PM2
pm2 start npm --name "agentflow" -- start

# Enable startup on reboot
pm2 startup
pm2 save
```

#### 3.3 Configure Nginx

Create `/etc/nginx/sites-available/agentflow`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/agentflow /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Setup SSL
sudo certbot --nginx -d your-domain.com
```

## Environment Variables for Production

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/agentflow?retryWrites=true&w=majority

# Cohere AI
COHERE_API_KEY=your-production-key

# Security
JWT_SECRET=generate-with: openssl rand -base64 32
SESSION_SECRET=generate-with: openssl rand -base64 32

# Logging
LOG_LEVEL=warn

# Performance
NODE_OPTIONS=--max-old-space-size=2048
```

## Security Best Practices

### 1. Environment Variables

```bash
# Never commit secrets
echo ".env.local" >> .gitignore
echo ".env.production.local" >> .gitignore

# Use secure secret management:
# - Vercel Environment Variables
# - AWS Secrets Manager
# - HashiCorp Vault
```

### 2. Database Security

```bash
# MongoDB Atlas
- Enable IP Whitelisting (not 0.0.0.0/0)
- Use VPC Peering for production
- Enable encryption at rest
- Enable encryption in transit
- Use strong passwords (32+ characters)
- Rotate credentials regularly
```

### 3. API Security

```javascript
// Add rate limiting
// npm install express-rate-limit

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. CORS Configuration

```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.NEXT_PUBLIC_APP_URL,
  credentials: true,
}));
```

### 5. HTTPS/SSL

- Use Let's Encrypt (free SSL certificates)
- Enable HSTS headers
- Redirect HTTP to HTTPS

### 6. Input Validation

All endpoints use Zod validation (already implemented):
- Validates request data
- Prevents injection attacks
- Type-safe validation

## Monitoring and Logging

### 1. Application Logging

Logs are stored in `/logs`:
- `error.log` - Error logs
- `combined.log` - All logs
- Max size: 5MB per file
- Max files: 5-10 files kept

### 2. Error Tracking (Optional)

```bash
# Install Sentry for error tracking
npm install @sentry/nextjs

# Configure in next.config.js
```

### 3. Performance Monitoring (Optional)

```bash
# Install New Relic or similar
npm install newrelic
```

### 4. Database Monitoring

- MongoDB Atlas built-in metrics
- Query performance analysis
- Connection monitoring

## Backup and Recovery

### 1. MongoDB Backup

```bash
# Automated daily backups with Atlas
# Manual backup:
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/agentflow" --out=./backup

# Restore from backup:
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/agentflow" ./backup/agentflow
```

### 2. Application Backup

```bash
# Backup repository
git push origin main

# Backup logs
tar czf logs_backup_$(date +%Y%m%d).tar.gz logs/
```

### 3. Disaster Recovery Plan

1. Database backup stored in separate region
2. Application code backed up on GitHub
3. Automated daily backups enabled
4. Recovery procedures tested monthly

## Performance Optimization

### 1. Database Optimization

```javascript
// Ensure indexes are created
db.tasks.createIndex({ status: 1, priority: 1 });
db.tasks.createIndex({ assignedAgent: 1 });
db.agents.createIndex({ name: 1 });
db.conversations.createIndex({ userId: 1, createdAt: -1 });
```

### 2. API Optimization

- Pagination implemented (future)
- Caching strategy (future)
- Query optimization
- Connection pooling

### 3. Frontend Optimization

- Image optimization
- Code splitting
- Bundle size optimization
- Lazy loading

## Scaling Strategy

### Phase 1: Small Scale (< 1000 users)

- Single server
- MongoDB Atlas shared tier
- CDN for static assets

### Phase 2: Medium Scale (1000-10000 users)

- Multiple application instances
- Load balancer (Nginx/HAProxy)
- MongoDB Atlas dedicated tier
- Redis caching layer

### Phase 3: Large Scale (> 10000 users)

- Kubernetes cluster
- MongoDB Atlas sharded cluster
- Distributed caching (Redis Cluster)
- Multiple regions/data centers
- Message queues (RabbitMQ/Kafka)

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Post-Deployment Checklist

- [ ] Health check endpoint responds (GET /api/health)
- [ ] Database connection verified
- [ ] All environment variables configured
- [ ] SSL certificate valid
- [ ] Domain resolves correctly
- [ ] Error logging working
- [ ] Monitoring dashboards accessible
- [ ] Backup automation running
- [ ] Logs rotating correctly
- [ ] API endpoints responding

## Support and Troubleshooting

### Common Issues

**Application won't start:**
- Check environment variables
- Verify MongoDB connection
- Check logs in `/logs` directory

**Database connection timeout:**
- Verify MongoDB URI
- Check network access rules
- Verify credentials

**Memory issues:**
- Increase allocated memory
- Check for memory leaks
- Optimize database queries

## Contact

For deployment assistance:
- Documentation: https://agentflow.io/docs
- Support Email: support@agentflow.io
- GitHub Issues: [project repository]
