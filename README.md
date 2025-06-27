# MultiDB Project

A NestJS application demonstrating multi-database configuration and management capabilities.

## Description

This project is built with NestJS and supports multiple database connections (MySQL, PostgreSQL, and SQLite) using TypeORM. It includes a complete setup for database migrations, Docker containerization, and development tools.

## Prerequisites

- Node.js (LTS version recommended)
- Docker and Docker Compose
- PowerShell 7+ (for Windows users)
- npm or yarn package manager

## Tech Stack

- **Framework:** NestJS v10
- **Language:** TypeScript
- **ORM:** TypeORM
- **Databases:** 
  - MySQL
  - PostgreSQL
  - SQLite
- **Validation:** class-validator, class-transformer, Joi
- **Development:** ESLint, Prettier, Jest

## Project Structure

```
multidb/
├── src/
│   ├── common/          # Common utilities and filters
│   ├── config/          # Configuration and validation schemas
│   ├── database/        # Database configuration and connections
│   ├── migrations/      # TypeORM migrations
│   └── modules/         # Feature modules
├── scripts/            # Utility scripts for development
├── test/              # E2E tests
└── docker-compose.yml # Docker services configuration
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd multidb
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure your environment variables in the `.env` file

## Development

### Running the Application

```bash
# Development mode
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

### Database Migrations

```bash
# Generate a new migration
npm run migration:generate -- src/migrations/MigrationName

# Create a new empty migration
npm run migration:create -- src/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

### Docker Commands

```bash
# Reset and rebuild containers
npm run docker:reset

# Update and restart containers
npm run docker:update
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Docker Support

The project includes Docker configuration for easy deployment and development. The `docker-compose.yml` file defines all necessary services.

To start the Docker environment:

```bash
docker-compose up -d
```

## Scripts

- `reset-and-rebuild.ps1`: Resets and rebuilds Docker containers
- `update-and-restart.ps1`: Updates dependencies and restarts services
- `mysql-init.sql`: Initial MySQL database setup
- `test-db-example.ps1`: Database testing utility

## Configuration

The application uses a configuration system based on environment variables with validation. Key configuration files:

- `src/config/configuration.ts`: Main configuration structure
- `src/config/validation.schema.ts`: Environment variables validation schema
- `src/database/ormconfig.factory.ts`: Database connection configuration

## License

This project is licensed under the MIT License.
