# Overview

This is a full-stack e-commerce application for selling pants, built with React frontend and Express.js backend. The application features a modern, responsive design with a complete shopping experience including product browsing, filtering, cart management, and order processing with Telegram notifications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**React with TypeScript**: Uses modern React 18 with TypeScript for type safety and better developer experience. Built with Vite for fast development and optimized production builds.

**Component Structure**: Follows a clean component architecture with:
- UI components using Radix UI primitives with shadcn/ui styling
- Page-level components for routing (home, products, product-detail, checkout)
- Layout components (navbar, footer) for consistent structure
- Feature-specific components (cart, product, checkout forms)

**State Management**: 
- Zustand for cart state management with persistence
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod validation for form handling

**Styling**: 
- Tailwind CSS with custom design system
- CSS variables for theming
- Framer Motion for animations and transitions
- Responsive design with mobile-first approach

**Routing**: Uses Wouter for lightweight client-side routing

## Backend Architecture

**Express.js Server**: RESTful API server with TypeScript support, featuring:
- Product management endpoints (GET /api/products, GET /api/products/:id, etc.)
- Order creation endpoint (POST /api/orders)
- Category-based product filtering
- Request/response logging middleware

**Data Layer**: 
- Memory-based storage implementation (MemStorage) for development
- Interface-based design (IStorage) allowing easy swapping to database solutions
- Sample product data initialization for demonstration

**Development Setup**: 
- Vite integration for development mode
- Hot module replacement in development
- Static file serving in production
- Error handling middleware

## Database Schema

Uses Drizzle ORM with PostgreSQL schema definitions:

**Products Table**:
- UUID primary keys
- Product details (name, description, price, category, gender)
- Array fields for sizes, colors, and images
- Inventory tracking and ratings
- Timestamps for creation tracking

**Orders Table**:
- Customer information (name, email, phone)
- Shipping details (address, city, postal code)
- Order items stored as JSON
- Order status tracking
- Telegram notification status

## External Dependencies

**UI Framework**: Radix UI primitives provide accessible, unstyled components that are customized with Tailwind CSS through shadcn/ui

**Database**: 
- Drizzle ORM for type-safe database operations
- Neon Database serverless PostgreSQL for production
- Drizzle Kit for schema migrations

**Notifications**: Telegram Bot API integration for real-time order notifications to store administrators

**Styling & Animation**:
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations and transitions
- Lucide React for consistent iconography

**Development Tools**:
- TypeScript for type safety across the stack
- Vite for fast development builds
- ESBuild for production server bundling
- Replit-specific plugins for development environment integration

**Form Handling**: React Hook Form with Hookform Resolvers for Zod schema validation ensures robust form validation and error handling