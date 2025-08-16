# Motor Insurance Platform (Malaysia)

Comprehensive digital insurance platform for Malaysian motor insurance with JPJ integration and NCD support.

## Project Structure

This is a monorepo containing:

- **`motor-my-api/`** - NestJS backend API
- **`motor-my-frontend/`** - Next.js frontend application
- **`docs/`** - Project documentation
- **`.github/`** - CI/CD workflows

## Quick Start

### Prerequisites

- Node.js 20+ (LTS)
- PostgreSQL 15+
- Redis 7+
- Docker (optional, for databases)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd auto-insurance
   ```

2. **Start databases (with Docker):**
   ```bash
   docker run --name postgres-dev -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=motor_insurance_dev -p 5432:5432 -d postgres:15
   docker run --name redis-dev -p 6379:6379 -d redis:7
   ```

3. **Set up backend:**
   ```bash
   cd motor-my-api
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run prisma:migrate
   npm run prisma:seed
   npm run start:dev
   ```

4. **Set up frontend (in new terminal):**
   ```bash
   cd motor-my-frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```

5. **Access the applications:**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

## Features

### Core Insurance Features
- **Quote Generation**: Instant motor insurance quotes
- **Policy Management**: Full policy lifecycle management
- **Claims Processing**: Digital claims submission and tracking
- **Document Generation**: PDF policies and certificates

### Malaysian Compliance
- **JPJ eINSURANS Integration**: Official motor registry
- **NCD Verification**: Central No Claims Discount database
- **SST Calculation**: 8% Service & Sales Tax compliance
- **e-Cover Note**: Digital insurance certificate
- **Multi-language**: English and Bahasa Malaysia

### Technical Features
- **Authentication**: Passwordless magic link auth
- **Security**: PII encryption, NRIC hashing, audit logging
- **Performance**: Redis caching, optimized queries
- **Monitoring**: OpenTelemetry observability
- **Testing**: Comprehensive test coverage

## Architecture

### Backend (NestJS)
- **Modular Design**: Separate modules for auth, quotes, policies, claims
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for performance and rate limiting
- **API**: REST with OpenAPI 3.1 specification
- **Security**: JWT tokens, rate limiting, audit logs

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with design system
- **Forms**: React Hook Form with Zod validation
- **State**: React Query for server state
- **Testing**: Jest with React Testing Library

### Infrastructure
- **CI/CD**: GitHub Actions with multi-environment deployment
- **Frontend Hosting**: Vercel with edge functions
- **Backend Hosting**: Fly.io or AWS ECS
- **Databases**: Managed PostgreSQL and Redis
- **Monitoring**: OpenTelemetry with observability stack

## Development

### Commands

```bash
# Backend
cd motor-my-api
npm run start:dev        # Development server
npm run test             # Run tests
npm run lint             # Code linting
npm run prisma:migrate   # Database migrations

# Frontend  
cd motor-my-frontend
npm run dev              # Development server
npm run test             # Run tests
npm run build            # Production build
npm run lint             # Code linting

# Both
npm run typecheck        # TypeScript checking
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Jest**: Unit and integration testing

## Deployment

### Environments

- **Development**: Auto-deploy from `develop` branch
- **Production**: Auto-deploy from `main` branch

### Backend Deployment (Fly.io)
```bash
# Install Fly CLI and deploy
fly deploy --config fly.toml
```

### Frontend Deployment (Vercel)
```bash
# Connected to GitHub for auto-deployment
vercel --prod
```

## Documentation

- **API Documentation**: Available at `/api-docs` when running
- **Database Schema**: See `motor-my-api/prisma/schema.prisma`
- **Architecture Docs**: See `docs/architecture/`
- **User Stories**: See `docs/stories/`

## Contributing

1. Create feature branch from `develop`
2. Make changes with tests
3. Run quality checks: `npm run lint && npm run typecheck && npm test`
4. Create pull request to `develop`
5. After review, merge to `develop`
6. For production release, merge `develop` to `main`

## License

Private - All rights reserved

## Support

For development support, please check:
- Backend README: `motor-my-api/README.md`
- Frontend README: `motor-my-frontend/README.md`
- Architecture documentation: `docs/architecture/`