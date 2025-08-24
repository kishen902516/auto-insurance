# Motor Insurance API (Malaysia)

NestJS-based REST API for Malaysian motor insurance platform with JPJ integration.

## Local Development Setup

### Prerequisites

- Node.js 20+ (LTS)
- PostgreSQL 15+
- Redis 7+
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd motor-my-api
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your local database credentials
   ```

3. **Start required services:**
   ```bash
   # PostgreSQL (if using Docker)
   docker run --name postgres-dev -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=motor_insurance_dev -p 5432:5432 -d postgres:15
   
   # Redis (if using Docker)
   docker run --name redis-dev -p 6379:6379 -d redis:7
   ```

4. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. **Start the development server:**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

### Development Commands

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugging

# Testing
npm test                   # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:e2e          # Run e2e tests
npm run test:cov          # Run tests with coverage

# Database
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Seed database
npx prisma studio         # Open database browser

# Code Quality
npm run lint              # Lint code
npm run typecheck         # Type checking
npm run format            # Format code

# Build
npm run build             # Build for production
npm run start:prod        # Start production build
```

### Project Structure

```
src/
├── auth/           # Authentication module
├── quote/          # Quote management
├── policy/         # Policy management  
├── payments/       # Payment processing
├── integrations/   # External API integrations
├── claims/         # Claims processing
├── common/         # Shared utilities
└── main.ts         # Application entry point

prisma/
├── schema.prisma   # Database schema
├── migrations/     # Database migrations
└── seed.ts         # Database seeding
```

### Environment Variables

Key environment variables for local development:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/motor_insurance_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
NRIC_SALT=your-nric-salt
SST_RATE=0.08
```

### API Documentation

- OpenAPI spec: `http://localhost:3000/api`
- Swagger UI: `http://localhost:3000/api-docs`

### Malaysian-Specific Features

- **NCD Integration**: Central NCD database connectivity
- **JPJ eINSURANS**: Motor registry integration
- **SST Calculation**: 8% Service & Sales Tax
- **NRIC Hashing**: Secure IC number storage
- **Multi-language**: English and Bahasa Malaysia support

### Testing

The project includes:
- Unit tests for business logic
- Integration tests for API endpoints
- Database tests with test containers
- Authentication flow tests

### Deployment

See deployment documentation for:
- Fly.io deployment
- AWS ECS deployment
- Environment configuration
- Secrets management