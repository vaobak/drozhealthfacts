# Database Setup for Dr. Oz Health Facts Affiliate System

This directory contains the database schema and migration scripts for the affiliate system.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database (SQLite - Default)
```bash
# Run migration to create tables
npm run db:migrate

# Check migration status
npm run db:status
```

### 3. Start API Server
```bash
# Start API server only
npm run server

# Start both API server and frontend
npm run start:full
```

## 📊 Supported Databases

### SQLite (Default - No Setup Required)
```bash
# Uses local file: ./database/droz_health_facts.db
DB_TYPE=sqlite npm run db:migrate
```

### PostgreSQL
```bash
# Install PostgreSQL and create database
createdb droz_health_facts

# Set environment variables
export DB_TYPE=postgresql
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=droz_health_facts
export DB_USER=postgres
export DB_PASSWORD=your_password

# Run migration
npm run db:migrate
```

### MySQL
```bash
# Install MySQL and create database
mysql -u root -p -e "CREATE DATABASE droz_health_facts;"

# Set environment variables
export DB_TYPE=mysql
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=droz_health_facts
export DB_USER=root
export DB_PASSWORD=your_password

# Run migration
npm run db:migrate
```

## 🛠️ Migration Commands

```bash
# Run migration (create tables)
npm run db:migrate

# Check migration status
npm run db:status

# Rollback migration (drop tables)
npm run db:rollback

# Setup database (alias for migrate)
npm run db:setup
```

## 📋 Database Schema

### Tables Created:
- **affiliate_links** - Store affiliate product information
- **click_analytics** - Track user clicks and behavior
- **user_sessions** - Manage admin authentication sessions
- **login_attempts** - Security monitoring for login attempts
- **conversions** - Track successful conversions and commissions

### Views Created:
- **daily_click_stats** - Daily click statistics
- **link_performance** - Link performance summary with conversion rates
- **monthly_revenue** - Monthly revenue reports

### Sample Data:
- 3 sample affiliate links are automatically inserted
- Ready-to-use test data for development

## 🔧 Environment Variables

Create a `.env.local` file with your database configuration:

```bash
# Database Configuration
DB_TYPE=sqlite                    # sqlite, postgresql, mysql
DB_HOST=localhost                 # Database host
DB_PORT=5432                      # Database port
DB_NAME=droz_health_facts        # Database name
DB_USER=postgres                  # Database user
DB_PASSWORD=your_password         # Database password
DB_FILE=./database/droz_health_facts.db  # SQLite file path

# API Server Configuration
PORT=3001                         # API server port
API_KEY=your_secure_api_key      # API authentication key
PROJECT_ID=droz-health-facts     # Project identifier
ALLOWED_ORIGINS=http://localhost:3000,https://drozhealthfacts.com
```

## 🌐 API Endpoints

Once the API server is running, these endpoints are available:

### Health Check
- `GET /api/health` - Server health status

### Affiliate Links
- `GET /api/affiliate-links` - Get all affiliate links
- `GET /api/affiliate-links/slug/:slug` - Get link by slug
- `POST /api/affiliate-links` - Create new affiliate link
- `PUT /api/affiliate-links/:id` - Update affiliate link
- `DELETE /api/affiliate-links/:id` - Delete affiliate link
- `POST /api/affiliate-links/:id/increment-clicks` - Increment click count

### Analytics
- `GET /api/click-analytics` - Get click analytics
- `POST /api/click-analytics` - Track new click
- `GET /api/affiliate-stats` - Get statistics summary

### Sync (for migration from localStorage)
- `POST /api/affiliate-links/sync` - Sync affiliate link
- `POST /api/click-analytics/sync` - Sync click analytics

## 🔐 Authentication

All API endpoints require authentication:

```javascript
// Headers required for API requests
{
  'Authorization': 'Bearer your_api_key',
  'X-Project-ID': 'droz-health-facts',
  'Content-Type': 'application/json'
}
```

## 📈 Performance Features

- **Indexes** - Optimized database indexes for fast queries
- **Rate Limiting** - 1000 requests per 15 minutes per IP
- **Connection Pooling** - Efficient database connections
- **Caching** - Built-in query result caching
- **Compression** - Response compression for faster transfers

## 🔒 Security Features

- **API Key Authentication** - Secure API access
- **Rate Limiting** - Prevent abuse and DDoS
- **Input Validation** - Sanitize all inputs
- **SQL Injection Protection** - Parameterized queries
- **CORS Protection** - Controlled cross-origin access
- **Helmet Security** - Security headers and protection

## 🚨 Troubleshooting

### Migration Fails
```bash
# Check database connection
npm run db:status

# Try rollback and re-migrate
npm run db:rollback
npm run db:migrate
```

### API Server Won't Start
```bash
# Check if port is in use
lsof -i :3001

# Try different port
PORT=3002 npm run server
```

### Database Connection Issues
```bash
# Test database connection
node -e "
const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'droz_health_facts',
  user: 'postgres',
  password: 'your_password'
});
client.connect().then(() => {
  console.log('✅ Connected');
  client.end();
}).catch(err => {
  console.error('❌ Connection failed:', err.message);
});
"
```

## 📊 Monitoring

### Database Size
```bash
# SQLite
ls -lh database/droz_health_facts.db

# PostgreSQL
psql -d droz_health_facts -c "SELECT pg_size_pretty(pg_database_size('droz_health_facts'));"

# MySQL
mysql -e "SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) AS 'DB Size in MB' FROM information_schema.tables WHERE table_schema='droz_health_facts';"
```

### Performance Monitoring
```bash
# Check API server logs
npm run server 2>&1 | tee logs/api.log

# Monitor database queries (PostgreSQL)
tail -f /var/log/postgresql/postgresql-*.log
```

## 🔄 Backup & Restore

### SQLite Backup
```bash
# Backup
cp database/droz_health_facts.db database/backup_$(date +%Y%m%d_%H%M%S).db

# Restore
cp database/backup_20260204_120000.db database/droz_health_facts.db
```

### PostgreSQL Backup
```bash
# Backup
pg_dump droz_health_facts > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql droz_health_facts < backup_20260204_120000.sql
```

### MySQL Backup
```bash
# Backup
mysqldump droz_health_facts > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
mysql droz_health_facts < backup_20260204_120000.sql
```

## 🎯 Next Steps

1. **Setup Cloud Database** - Deploy to production database
2. **Configure SSL** - Enable HTTPS for API endpoints
3. **Setup Monitoring** - Add application monitoring
4. **Implement Caching** - Add Redis for better performance
5. **Add Tests** - Create automated tests for API endpoints

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the API server logs
3. Verify database connection and migration status
4. Ensure all environment variables are set correctly