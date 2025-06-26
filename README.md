# NestJS Multi-Database Starter

A scalable NestJS starter project with support for multiple database engines (PostgreSQL, MySQL, and SQLite) following clean architecture principles.

## Features

- 🏗️ **Clean Architecture**: Modular and decoupled design following SOLID principles
- 📦 **Multiple Database Support**: 
  - PostgreSQL
  - MySQL/MariaDB
  - SQLite (including in-memory for testing)
- ⚙️ **Configuration**:
  - Environment-based configuration
  - Validation using Joi
  - Type-safe configuration using @nestjs/config
- 🔧 **Development Tools**:
  - Docker and docker-compose setup
  - TypeORM for database operations
  - Class validation and transformation
  - Global exception handling
- 🧪 **Testing Ready**:
  - Jest configuration
  - SQLite in-memory database support
  - E2E testing setup

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker and docker-compose (for running databases)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nestjs-multidb-starter.git
   cd nestjs-multidb-starter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the databases using Docker:
   ```bash
   docker-compose up -d
   ```

5. Run the application:
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

## Database Configuration

The application supports three database engines. Configure your preferred database in the `.env` file:

### PostgreSQL
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=multidb
```

### MySQL
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=mysql
DB_PASSWORD=mysql
DB_DATABASE=multidb
```

### SQLite
```env
DB_TYPE=sqlite
DB_SQLITE_PATH=:memory: # or ./data/sqlite.db for file-based
```

## Project Structure

```
src/
├── config/             # Configuration modules and validation
├── core/              # Core functionality and providers
├── database/          # Database configuration and migrations
├── modules/           # Feature modules
│   └── example/       # Example module with CRUD operations
├── common/            # Shared utilities, filters, and pipes
└── main.ts           # Application entry point
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker Support

The project includes a `docker-compose.yml` file that sets up:
- PostgreSQL database
- MySQL database
- Adminer for database management

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

## Development

1. Create a new module:
   ```bash
   nest g module modules/your-module
   nest g controller modules/your-module
   nest g service modules/your-module
   ```

2. Create an entity:
   ```bash
   # Create manually in the module's entities folder
   src/modules/your-module/entities/your-entity.entity.ts
   ```

3. Run migrations:
   ```bash
   # Generate a migration
   npm run typeorm:generate-migration

   # Run migrations
   npm run typeorm:run-migrations
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
