# GaonBasket Development Setup Guide

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KHASF715/gaonbasket.git
cd gaonbasket
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (root, frontend, backend).

### 3. Setup Environment Variables

#### Root Level
```bash
cp .env.example .env.local
```

#### Frontend
```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name (optional)
NEXT_PUBLIC_APP_NAME=GaonBasket
NEXT_PUBLIC_APP_DESCRIPTION=Har Gaon Ka Online Bazaar
```

#### Backend
```bash
cp apps/api/.env.example apps/api/.env.local
```

Edit `apps/api/.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/gaonbasket?retryWrites=true&w=majority
API_PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@gaonbasket.com
```

### 4. Get MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to `apps/api/.env.local`

### 5. Start Development Servers

```bash
npm run dev
```

This will start both frontend and backend in parallel.

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 6. Seed Database (Optional)

```bash
cd apps/api
npm run seed
```

This creates test data:
- Admin: `admin@gaonbasket.com` / `Admin@123`
- Customer: `customer@gaonbasket.com` / `Customer@123`

## Running Individual Apps

### Frontend Only
```bash
cd apps/web
npm run dev
```

### Backend Only
```bash
cd apps/api
npm run dev
```

## Available Scripts

### Root Level
- `npm run dev` - Start all apps
- `npm run build` - Build all apps
- `npm run start` - Start production servers
- `npm run lint` - Lint all code
- `npm run type-check` - Type check all code
- `npm run format` - Format all code

### Frontend (apps/web)
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Lint code
- `npm run type-check` - Type check
- `npm run format` - Format code

### Backend (apps/api)
- `npm run dev` - Development server with hot reload
- `npm run build` - Build TypeScript
- `npm run start` - Start production server
- `npm run lint` - Lint code
- `npm run type-check` - Type check
- `npm run format` - Format code
- `npm run seed` - Seed database

## Docker Development

### Start with Docker Compose

```bash
docker-compose up
```

This will:
- Start MongoDB on port 27017
- Start backend API on port 5000
- Start frontend on port 3000

Stop:
```bash
docker-compose down
```

## Project Structure

```
gaonbasket/
├── apps/
│   ├── web/           # Next.js 15 Frontend
│   └── api/           # Express.js Backend
├── packages/
│   └── utils/         # Shared utilities
├── docs/              # Documentation
├── .github/           # GitHub Actions workflows
├── docker-compose.yml # Docker configuration
├── package.json       # Root workspace
├── turbo.json         # Turborepo config
└── tsconfig.json      # TypeScript config
```

## Database Schema

### Users
- ID, name, email, phone, password, role, profile image, email verified, active status

### Products
- ID, name, description, price, original price, category, image, images, stock, unit, SKU, rating

### Orders
- ID, user, items, shipping address, payment method, payment status, order status, total, coupon, notes

### Categories
- ID, name, slug, image, description, active status

### Cart
- ID, user, items (product, quantity, price), totals, coupon

### Addresses
- ID, user, type, street, city, state, postal code, landmark, default, coordinates

## API Documentation

See [docs/API.md](../docs/API.md) for complete API documentation.

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB URI in `.env.local`
- Ensure IP is whitelisted in MongoDB Atlas

### Port Already in Use
- Change port in `.env.local` or kill the process using the port

### Dependencies Installation Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

## Support

For issues and questions:
- Create an issue on GitHub
- Email: support@gaonbasket.com

---

**Designed & Developed by Mohammad Ashif**
