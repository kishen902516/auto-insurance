# Motor Insurance Frontend (Malaysia)

Next.js frontend application for Malaysian motor insurance platform.

## Local Development Setup

### Prerequisites

- Node.js 20+ (LTS)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd motor-my-frontend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3001`

### Development Commands

```bash
# Development
npm run dev               # Start development server
npm run build             # Build for production
npm run start             # Start production build

# Testing
npm test                  # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage

# Code Quality
npm run lint              # Lint code
npm run typecheck         # Type checking
```

### Project Structure

```
app/
├── globals.css          # Global styles
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── quote/               # Quote flow pages
├── policy/              # Policy management
└── claims/              # Claims pages

components/
├── ui/                  # Reusable UI components
├── forms/               # Form components
└── layout/              # Layout components

hooks/
├── useAuth.ts           # Authentication hook
├── useQuote.ts          # Quote management
└── useApi.ts            # API integration

utils/
├── api.ts               # API client
├── validation.ts        # Form validation
└── formatting.ts        # Data formatting
```

### Environment Variables

Key environment variables for local development:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_NCD_REQUIRED=false
NEXT_PUBLIC_PAYMENTS_SANDBOX=true
```

### Features

- **Responsive Design**: Mobile-first Tailwind CSS
- **Type Safety**: Full TypeScript coverage
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: Axios with React Query
- **Testing**: Jest with React Testing Library
- **Accessibility**: WCAG 2.2 AA compliance

### Malaysian-Specific Features

- **Bilingual Support**: English and Bahasa Malaysia
- **IC Number Validation**: Malaysian NRIC format
- **Postcode Validation**: Malaysian postal codes
- **Currency Formatting**: Malaysian Ringgit (MYR)
- **JPJ Integration**: Road tax and registration

### Page Structure

- `/` - Homepage with product overview
- `/quote` - Insurance quote flow
- `/policy` - Policy management dashboard
- `/claims` - Claims submission and tracking
- `/login` - Authentication
- `/profile` - User profile management

### Styling

Uses Tailwind CSS with custom design system:

- Primary colors: Blue theme for trust/reliability
- Typography: Inter font family
- Components: Reusable component classes
- Responsive: Mobile-first breakpoints

### API Integration

Connects to backend API for:
- User authentication
- Quote calculation
- Policy management
- Claims processing
- Document generation

### Testing

The project includes:
- Component unit tests
- User interaction tests
- Form validation tests
- API integration tests
- Accessibility tests

### Deployment

Optimized for Vercel deployment:
- Static generation where possible
- Image optimization
- Font optimization
- Bundle analysis
- Edge middleware for auth

### Performance

- Core Web Vitals optimized
- Lazy loading for components
- Image optimization
- Code splitting
- Caching strategies