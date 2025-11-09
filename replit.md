# Urinalysis Dipstick Test Application

## Overview

This is a medical testing application designed to analyze urinalysis dipstick images and provide professional test results. The application allows users to capture or upload dipstick images, analyze them for 10 key urine parameters (Leukocyte, Nitrite, Urobilinogen, Protein, pH, Blood, Specific Gravity, Ketone, Bilirubin, and Glucose), and view comprehensive test results with historical tracking.

The application follows Material Design principles adapted for healthcare interfaces, prioritizing clarity, trust, and professional presentation essential for medical applications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing

**UI Component Library**: Radix UI primitives with shadcn/ui components styled using Tailwind CSS
- Design system follows the "new-york" style variant
- Uses CSS variables for theming with support for light and dark modes
- Custom spacing and elevation system for medical UI consistency

**State Management**: 
- TanStack Query (React Query) for server state management and data fetching
- Local component state using React hooks for UI state

**Styling Strategy**:
- Tailwind CSS with custom configuration for medical UI design
- Custom color system using HSL values with CSS variables
- Material Design-inspired spacing units (2, 3, 4, 6, 8, 12)
- Responsive design with mobile-first approach

**Key Design Decisions**:
- **Problem**: Medical applications require professional, trustworthy UI
- **Solution**: Material Design system adapted for healthcare with established interaction patterns
- **Rationale**: Provides structured hierarchy and professional appearance essential for healthcare interfaces

### Backend Architecture

**Runtime**: Node.js with Express framework

**API Design**: RESTful API with the following endpoints:
- `POST /api/tests` - Create new urinalysis test with image upload and results
- `GET /api/tests` - Retrieve all test records
- Test history retrieval with support for recent tests

**File Upload Handling**: 
- Multer middleware for multipart/form-data processing
- In-memory storage with 10MB file size limit
- Base64 encoding for image storage

**Data Validation**: 
- Zod schemas for runtime type validation
- Integration with Drizzle ORM schemas via drizzle-zod
- Comprehensive error handling with user-friendly validation messages

**Session Management**: Infrastructure in place for connect-pg-simple session store (currently using in-memory storage)

**Development Environment**:
- Hot module replacement (HMR) via Vite in development
- Custom logging middleware for API request tracking
- Replit-specific development tooling integration

### Data Storage

**ORM**: Drizzle ORM with PostgreSQL dialect configuration

**Current Implementation**: In-memory storage (MemStorage class) for development
- Provides interface-based storage abstraction (IStorage)
- Supports easy migration to persistent database

**Database Schema**:
```typescript
users: {
  id: UUID (primary key)
  username: text (unique)
  password: text
}

urinalysis_tests: {
  id: UUID (primary key)
  imageUrl: text (nullable)
  results: JSONB array of test parameters
  testDate: timestamp (default now)
  summary: text
}
```

**Test Parameters Structure**:
- code: Parameter identifier (L, N, U, P, PH, B, S, K, Bi, G)
- name: Full parameter name
- result: Test value
- isNormal: Boolean flag for result interpretation

**Design Decision**:
- **Problem**: Need flexible storage for test results with varying parameter structures
- **Solution**: JSONB column for results array
- **Rationale**: Allows schema flexibility while maintaining queryability and type safety through Zod validation

### External Dependencies

**UI Component Libraries**:
- @radix-ui/* - Headless UI primitives for accessibility-compliant components
- shadcn/ui component patterns via components.json configuration
- lucide-react for consistent iconography

**Data Management**:
- @tanstack/react-query - Server state management and caching
- react-hook-form with @hookform/resolvers - Form handling and validation
- date-fns - Date manipulation and formatting

**Database & ORM**:
- drizzle-orm - Type-safe ORM
- drizzle-kit - Database migration tooling
- @neondatabase/serverless - PostgreSQL driver for serverless environments
- drizzle-zod - Schema validation integration

**Styling**:
- tailwindcss - Utility-first CSS framework
- class-variance-authority - Type-safe variant styling
- tailwind-merge - Intelligent class merging

**Build Tools**:
- vite - Frontend build tool and dev server
- @vitejs/plugin-react - React integration for Vite
- esbuild - Backend bundling for production
- tsx - TypeScript execution for development

**File Handling**:
- multer - Multipart form data processing for image uploads

**Development Tools**:
- @replit/vite-plugin-* - Replit-specific development enhancements
- wouter - Lightweight routing library

**Font Resources**:
- Google Fonts CDN for Inter/Roboto typography (referenced in design guidelines)