# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Step 1: Connect Repository
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Select `apps/web` as root directory

### Step 2: Environment Variables
1. Go to Settings → Environment Variables
2. Add the following:
   ```
   NEXT_PUBLIC_API_URL=https://api.gaonbasket.com
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-value
   ```

### Step 3: Deploy
Click "Deploy" - Vercel will automatically build and deploy

### Step 4: Custom Domain
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Backend Deployment (Render)

### Prerequisites
- Render account
- GitHub repository

### Step 1: Create Web Service
1. Go to [Render](https://render.com)
2. Click "Create New" → "Web Service"
3. Connect your GitHub repository
4. Select the repository

### Step 2: Configure Service
- **Name**: gaonbasket-api
- **Root Directory**: apps/api
- **Environment**: Node
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm run start`

### Step 3: Environment Variables
Add in Environment Variables section:
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=https://gaonbasket.com
NODE_ENV=production
API_PORT=5000
```

### Step 4: Deploy
Click "Deploy Service" - Render will build and deploy

### Step 5: Get API URL
- Copy the service URL from Render dashboard
- Use as `NEXT_PUBLIC_API_URL` in frontend

---

## Database Deployment (MongoDB Atlas)

### Step 1: Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Create" → Select "Shared" tier
3. Select region closest to your users

### Step 2: Create Database User
1. Go to Security → Database Access
2. Click "Add New Database User"
3. Create username and password
4. Set permissions to "Read/Write to Database"

### Step 3: Whitelist IP
1. Go to Security → Network Access
2. Click "Add IP Address"
3. Add your server IP(s)
4. Or allow access from anywhere (0.0.0.0/0) for development

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Copy the connection string
4. Use in backend `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/gaonbasket?retryWrites=true&w=majority
   ```

---

## Docker Deployment

### Build Images

**Backend:**
```bash
cd apps/api
docker build -t gaonbasket-api .
```

**Frontend:**
```bash
cd apps/web
docker build -t gaonbasket-web .
```

### Push to Registry

```bash
docker tag gaonbasket-api your-registry/gaonbasket-api:latest
docker push your-registry/gaonbasket-api:latest

docker tag gaonbasket-web your-registry/gaonbasket-web:latest
docker push your-registry/gaonbasket-web:latest
```

### Deploy with Docker Compose

```bash
docker-compose -f docker-compose.yml up -d
```

---

## Email Configuration (Nodemailer)

### Gmail Setup
1. Enable 2-factor authentication
2. Create App Password
3. Use in `.env.local`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ```

### SendGrid Setup
1. Create SendGrid account
2. Generate API key
3. Use SendGrid SMTP:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your-api-key
   ```

---

## Cloudinary Setup (Image Upload)

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up and get API credentials
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

---

## Production Checklist

### Security
- [ ] Change all default passwords
- [ ] Update JWT_SECRET with strong key
- [ ] Enable HTTPS on all domains
- [ ] Configure CORS properly
- [ ] Set rate limiting appropriately
- [ ] Use environment variables for all secrets

### Performance
- [ ] Enable database indexing
- [ ] Setup CDN for static assets
- [ ] Configure caching headers
- [ ] Enable gzip compression
- [ ] Setup monitoring and logging

### Database
- [ ] Setup automated backups
- [ ] Configure replica sets
- [ ] Test disaster recovery
- [ ] Monitor database performance

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Configure logging (Winston/Morgan)
- [ ] Setup uptime monitoring
- [ ] Configure alerts

### Maintenance
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process
- [ ] Create runbook for incidents
- [ ] Schedule regular updates

---

## Rollback Procedure

### Vercel
```bash
# Go to Deployments tab
# Click "Redeploy" on previous deployment
```

### Render
```bash
# Go to Logs
# Click "Re-deploy" button for previous deployment
```

### Manual Rollback
```bash
git revert <commit-hash>
git push origin main
# Re-deploy from updated main branch
```

---

## Monitoring & Logging

### Application Logs
- Vercel: Deployments → Logs
- Render: Logs tab
- Backend: Check server logs with `docker logs`

### Error Tracking
Consider implementing Sentry:
```bash
npm install @sentry/node
```

### Database Monitoring
- MongoDB Atlas: Charts & Metrics tabs
- Monitor query performance
- Track storage usage

---

## Scaling Strategy

### Phase 1: Initial Launch
- Single MongoDB cluster
- Single backend instance on Render
- Frontend on Vercel

### Phase 2: Growth
- MongoDB: Setup replica sets
- Backend: Multiple instances with load balancing
- Frontend: Edge functions for API proxying

### Phase 3: Large Scale
- Microservices architecture
- Redis for caching
- Message queues for async processing
- Separate read/write databases

---

## Support & Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**CORS Errors**
- Verify FRONTEND_URL matches actual frontend domain
- Check CORS configuration in backend
- Clear browser cache

**Deployment Failures**
- Check build logs for errors
- Verify environment variables are set
- Ensure package.json scripts are correct

---

**Designed & Developed by Mohammad Ashif**
