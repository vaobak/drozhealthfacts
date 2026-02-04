# 🚀 Complete Setup Guide - Dr. Oz Health Facts Affiliate System

This guide will help you set up the complete affiliate system with cloud database support.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- Database (SQLite/PostgreSQL/MySQL) - SQLite works out of the box

## 🎯 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Create database and tables (uses SQLite by default)
npm run db:setup

# Test database connection
npm run db:test
```

### 3. Start the System
```bash
# Start both API server and frontend
npm run start:full

# Or start separately:
# npm run server    # API server on port 3001
# npm run dev       # Frontend on port 3000
```

### 4. Access the System
- **Frontend**: http://localhost:3000
- **Affiliate Dashboard**: http://localhost:3000/affiliate
- **API Server**: http://localhost:3001/api
- **Password**: `@DRsuperZ6`

## 🔧 Detailed Setup

### Environment Configuration

Create `.env.local` file:
```bash
# Database Configuration
DB_TYPE=sqlite                    # sqlite, postgresql, mysql
DB_FILE=./database/droz_health_facts.db

# API Server Configuration
PORT=3001
API_KEY=droz-health-facts-api-key-2026
PROJECT_ID=droz-health-facts
ALLOWED_ORIGINS=http://localhost:3000,https://drozhealthfacts.com

# Frontend Configuration
REACT_APP_API_ENDPOINT=http://localhost:3001/api
REACT_APP_API_KEY=droz-health-facts-api-key-2026
REACT_APP_PROJECT_ID=droz-health-facts
REACT_APP_ENABLE_CLOUD_SYNC=true
REACT_APP_FALLBACK_TO_LOCAL=true
```

### Database Options

#### SQLite (Default - Recommended for Development)
```bash
# No additional setup required
npm run db:setup
```

#### PostgreSQL (Recommended for Production)
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

#### MySQL
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

## 🎮 Available Commands

### Database Commands
```bash
npm run db:migrate    # Create database tables
npm run db:rollback   # Drop all tables
npm run db:status     # Check migration status
npm run db:test       # Test database operations
npm run db:setup      # Alias for db:migrate
```

### Server Commands
```bash
npm run server        # Start API server
npm run server:dev    # Start API server with auto-reload
npm run dev           # Start frontend development server
npm run start:full    # Start both API server and frontend
```

### Build Commands
```bash
npm run build         # Build for production
npm run preview       # Preview production build
```

## 🔐 Security Features

### Authentication
- **Admin Password**: `@DRsuperZ6`
- **Session Timeout**: 2 hours
- **Rate Limiting**: 5 login attempts per 15 minutes
- **API Key Protection**: All API endpoints require authentication

### Security Headers
- CORS protection
- Helmet security middleware
- Rate limiting (1000 requests per 15 minutes)
- Input validation and sanitization

## 📊 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Server    │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│ (SQLite/PG/MY)  │
│   Port 3000     │    │   Port 3001     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **Frontend** makes API requests to backend
2. **API Server** handles authentication and database operations
3. **Database** stores affiliate links, analytics, and user sessions
4. **Fallback** to localStorage if cloud database is unavailable

## 🎯 Features Overview

### Affiliate Link Management
- ✅ Create, edit, delete affiliate links
- ✅ Two redirect types: Landing page vs Direct redirect
- ✅ Auto-redirect control (manual vs automatic)
- ✅ Click tracking and analytics
- ✅ Active/inactive status toggle

### Security & Authentication
- ✅ Password-protected admin dashboard
- ✅ Rate limiting and brute force protection
- ✅ Session management with timeout
- ✅ API key authentication

### Analytics & Reporting
- ✅ Click tracking with device detection
- ✅ Performance statistics
- ✅ Daily, weekly, monthly reports
- ✅ Conversion tracking (ready for future use)

### Cloud Database Support
- ✅ PostgreSQL, MySQL, SQLite support
- ✅ Automatic fallback to localStorage
- ✅ Data synchronization capabilities
- ✅ Migration and backup tools

## 🔄 Data Migration

### From localStorage to Cloud Database
```bash
# The system automatically syncs localStorage data to cloud database
# when cloud database becomes available

# Manual sync (if needed):
# Visit /affiliate dashboard and data will sync automatically
```

### Backup and Restore
```bash
# SQLite backup
cp database/droz_health_facts.db database/backup_$(date +%Y%m%d).db

# PostgreSQL backup
pg_dump droz_health_facts > backup_$(date +%Y%m%d).sql

# MySQL backup
mysqldump droz_health_facts > backup_$(date +%Y%m%d).sql
```

## 🌐 Production Deployment

### 1. Build for Production
```bash
npm run build
```

### 2. Setup Production Database
```bash
# PostgreSQL (recommended)
export DB_TYPE=postgresql
export DB_HOST=your-db-host
export DB_NAME=droz_health_facts
export DB_USER=your-db-user
export DB_PASSWORD=your-secure-password

npm run db:migrate
```

### 3. Configure Environment
```bash
# Production .env
NODE_ENV=production
PORT=3001
DB_TYPE=postgresql
DB_HOST=your-production-db-host
API_KEY=your-super-secure-api-key
ALLOWED_ORIGINS=https://drozhealthfacts.com
```

### 4. Deploy
```bash
# Start production server
npm run server

# Or use PM2 for process management
pm2 start server/api.js --name "droz-api"
```

## 🧪 Testing

### Database Tests
```bash
npm run db:test
```

### Manual Testing Checklist
- [ ] Can access affiliate dashboard at `/affiliate`
- [ ] Can login with password `@DRsuperZ6`
- [ ] Can create new affiliate links
- [ ] Can edit existing affiliate links
- [ ] Can delete affiliate links
- [ ] Can toggle active/inactive status
- [ ] Affiliate links redirect properly
- [ ] Click tracking works
- [ ] Statistics display correctly

### Sample Affiliate Links
After migration, these test links are available:
- `http://localhost:3000/formula99` - Landing page (manual click)
- `http://localhost:3000/immune-booster-pro` - Direct redirect
- `http://localhost:3000/keto-burn-max` - Landing page (auto-redirect)

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check database status
npm run db:status

# Test database connection
npm run db:test

# Reset database
npm run db:rollback
npm run db:migrate
```

### API Server Issues
```bash
# Check if port is in use
lsof -i :3001

# Try different port
PORT=3002 npm run server

# Check API server logs
npm run server 2>&1 | tee logs/api.log
```

### Frontend Issues
```bash
# Clear browser cache and localStorage
# Check browser console for errors
# Verify API endpoint in .env.local
```

### Common Issues

**"Database connection failed"**
- Check database is running
- Verify connection credentials
- Ensure database exists

**"API key authentication failed"**
- Check API_KEY in .env.local matches server
- Verify REACT_APP_API_KEY is set correctly

**"Blank page after login"**
- Check browser console for JavaScript errors
- Verify API server is running on correct port
- Check network tab for failed API requests

## 📞 Support

### Logs and Debugging
```bash
# API server logs
npm run server 2>&1 | tee logs/api.log

# Database query logs (PostgreSQL)
tail -f /var/log/postgresql/postgresql-*.log

# Frontend console logs
# Open browser developer tools > Console
```

### Performance Monitoring
```bash
# Database size
ls -lh database/droz_health_facts.db  # SQLite

# API response times
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:3001/api/health"
```

## 🎉 Success!

If everything is working correctly, you should see:
- ✅ Database tests pass
- ✅ API server running on port 3001
- ✅ Frontend running on port 3000
- ✅ Affiliate dashboard accessible with password
- ✅ Sample affiliate links working
- ✅ Click tracking functional

Your affiliate system is now ready for use! 🚀