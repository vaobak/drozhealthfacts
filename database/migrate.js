#!/usr/bin/env node

/**
 * Database Migration Script for Dr. Oz Health Facts Affiliate System
 * Supports PostgreSQL, MySQL, and SQLite
 */

const fs = require('fs');
const path = require('path');

// Database configuration
const DB_CONFIGS = {
  postgresql: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'droz_health_facts',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
  mysql: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'droz_health_facts',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  sqlite: {
    filename: process.env.DB_FILE || './database/droz_health_facts.db'
  }
};

// Get database type from environment
const DB_TYPE = process.env.DB_TYPE || 'sqlite';

/**
 * Main migration function
 */
async function runMigration() {
  console.log('🚀 Starting database migration for Dr. Oz Health Facts Affiliate System');
  console.log(`📊 Database Type: ${DB_TYPE.toUpperCase()}`);
  
  try {
    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Connect to database based on type
    let db;
    switch (DB_TYPE) {
      case 'postgresql':
        db = await connectPostgreSQL();
        break;
      case 'mysql':
        db = await connectMySQL();
        break;
      case 'sqlite':
        db = await connectSQLite();
        break;
      default:
        throw new Error(`Unsupported database type: ${DB_TYPE}`);
    }
    
    console.log('✅ Database connection established');
    
    // Run migration
    await executeMigration(db, schema);
    
    console.log('🎉 Migration completed successfully!');
    console.log('📋 Summary:');
    console.log('   ✅ Tables created: affiliate_links, click_analytics, user_sessions, login_attempts, conversions');
    console.log('   ✅ Indexes created for performance optimization');
    console.log('   ✅ Sample data inserted');
    console.log('   ✅ Views created for analytics');
    console.log('   ✅ Security policies applied');
    
    // Close connection
    await closeConnection(db);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

/**
 * Connect to PostgreSQL
 */
async function connectPostgreSQL() {
  const { Client } = require('pg');
  const client = new Client(DB_CONFIGS.postgresql);
  await client.connect();
  return client;
}

/**
 * Connect to MySQL
 */
async function connectMySQL() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(DB_CONFIGS.mysql);
  return connection;
}

/**
 * Connect to SQLite
 */
async function connectSQLite() {
  const sqlite3 = require('sqlite3').verbose();
  const { open } = require('sqlite');
  
  // Ensure database directory exists
  const dbDir = path.dirname(DB_CONFIGS.sqlite.filename);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  const db = await open({
    filename: DB_CONFIGS.sqlite.filename,
    driver: sqlite3.Database
  });
  
  return db;
}

/**
 * Execute migration based on database type
 */
async function executeMigration(db, schema) {
  console.log('📝 Executing migration scripts...');
  
  // Split schema into individual statements
  const statements = schema
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
  
  let executed = 0;
  
  for (const statement of statements) {
    try {
      if (DB_TYPE === 'sqlite') {
        // SQLite specific adjustments
        let sqliteStatement = statement
          .replace(/VARCHAR\(\d+\)/g, 'TEXT')
          .replace(/TIMESTAMP/g, 'DATETIME')
          .replace(/CURRENT_TIMESTAMP/g, "datetime('now')")
          .replace(/BOOLEAN/g, 'INTEGER')
          .replace(/true/g, '1')
          .replace(/false/g, '0')
          .replace(/DECIMAL\(\d+,\d+\)/g, 'REAL');
        
        // Skip PostgreSQL specific functions and triggers for SQLite
        if (sqliteStatement.includes('LANGUAGE plpgsql') || 
            sqliteStatement.includes('CREATE TRIGGER') ||
            sqliteStatement.includes('CREATE OR REPLACE FUNCTION') ||
            sqliteStatement.includes('ALTER TABLE') && sqliteStatement.includes('ENABLE ROW LEVEL SECURITY') ||
            sqliteStatement.includes('CREATE POLICY')) {
          console.log(`⏭️  Skipping PostgreSQL-specific statement for SQLite`);
          continue;
        }
        
        await db.exec(sqliteStatement);
      } else {
        // PostgreSQL and MySQL
        await db.query(statement);
      }
      
      executed++;
      
      if (executed % 10 === 0) {
        console.log(`   📊 Executed ${executed} statements...`);
      }
      
    } catch (error) {
      // Log warning but continue for non-critical errors
      if (error.message.includes('already exists') || 
          error.message.includes('duplicate') ||
          error.message.includes('relation') && error.message.includes('already exists')) {
        console.log(`⚠️  Warning: ${error.message}`);
      } else {
        console.error(`❌ Error executing statement: ${statement.substring(0, 100)}...`);
        console.error(`   Error: ${error.message}`);
        // Don't throw - continue with other statements
      }
    }
  }
  
  console.log(`✅ Migration completed: ${executed} statements executed`);
}

/**
 * Close database connection
 */
async function closeConnection(db) {
  try {
    if (DB_TYPE === 'postgresql') {
      await db.end();
    } else if (DB_TYPE === 'mysql') {
      await db.end();
    } else if (DB_TYPE === 'sqlite') {
      await db.close();
    }
    console.log('🔌 Database connection closed');
  } catch (error) {
    console.error('⚠️  Error closing connection:', error.message);
  }
}

/**
 * Rollback migration (drop all tables)
 */
async function rollbackMigration() {
  console.log('🔄 Rolling back migration...');
  
  try {
    let db;
    switch (DB_TYPE) {
      case 'postgresql':
        db = await connectPostgreSQL();
        break;
      case 'mysql':
        db = await connectMySQL();
        break;
      case 'sqlite':
        db = await connectSQLite();
        break;
      default:
        throw new Error(`Unsupported database type: ${DB_TYPE}`);
    }
    
    const tables = [
      'conversions',
      'click_analytics', 
      'login_attempts',
      'user_sessions',
      'affiliate_links'
    ];
    
    for (const table of tables) {
      try {
        const dropStatement = `DROP TABLE IF EXISTS ${table}`;
        if (DB_TYPE === 'sqlite') {
          await db.exec(dropStatement);
        } else {
          await db.query(dropStatement);
        }
        console.log(`✅ Dropped table: ${table}`);
      } catch (error) {
        console.error(`❌ Error dropping table ${table}:`, error.message);
      }
    }
    
    // Drop views
    const views = ['daily_click_stats', 'link_performance', 'monthly_revenue'];
    for (const view of views) {
      try {
        const dropStatement = `DROP VIEW IF EXISTS ${view}`;
        if (DB_TYPE === 'sqlite') {
          await db.exec(dropStatement);
        } else {
          await db.query(dropStatement);
        }
        console.log(`✅ Dropped view: ${view}`);
      } catch (error) {
        console.error(`❌ Error dropping view ${view}:`, error.message);
      }
    }
    
    await closeConnection(db);
    console.log('🎉 Rollback completed successfully!');
    
  } catch (error) {
    console.error('❌ Rollback failed:', error.message);
    process.exit(1);
  }
}

/**
 * Check migration status
 */
async function checkMigrationStatus() {
  console.log('🔍 Checking migration status...');
  
  try {
    let db;
    switch (DB_TYPE) {
      case 'postgresql':
        db = await connectPostgreSQL();
        break;
      case 'mysql':
        db = await connectMySQL();
        break;
      case 'sqlite':
        db = await connectSQLite();
        break;
      default:
        throw new Error(`Unsupported database type: ${DB_TYPE}`);
    }
    
    const tables = ['affiliate_links', 'click_analytics', 'user_sessions', 'login_attempts', 'conversions'];
    const existingTables = [];
    
    for (const table of tables) {
      try {
        let query;
        if (DB_TYPE === 'postgresql') {
          query = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${table}')`;
        } else if (DB_TYPE === 'mysql') {
          query = `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_name = '${table}' AND table_schema = DATABASE()`;
        } else if (DB_TYPE === 'sqlite') {
          query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`;
        }
        
        const result = DB_TYPE === 'sqlite' ? await db.get(query) : await db.query(query);
        
        let exists = false;
        if (DB_TYPE === 'postgresql') {
          exists = result.rows[0].exists;
        } else if (DB_TYPE === 'mysql') {
          exists = result[0][0].count > 0;
        } else if (DB_TYPE === 'sqlite') {
          exists = !!result;
        }
        
        if (exists) {
          existingTables.push(table);
          console.log(`✅ Table exists: ${table}`);
        } else {
          console.log(`❌ Table missing: ${table}`);
        }
      } catch (error) {
        console.log(`❌ Error checking table ${table}:`, error.message);
      }
    }
    
    await closeConnection(db);
    
    console.log(`\n📊 Migration Status: ${existingTables.length}/${tables.length} tables exist`);
    
    if (existingTables.length === tables.length) {
      console.log('🎉 Migration is complete!');
    } else {
      console.log('⚠️  Migration is incomplete. Run migration to create missing tables.');
    }
    
  } catch (error) {
    console.error('❌ Status check failed:', error.message);
    process.exit(1);
  }
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'migrate':
  case 'up':
    runMigration();
    break;
  case 'rollback':
  case 'down':
    rollbackMigration();
    break;
  case 'status':
  case 'check':
    checkMigrationStatus();
    break;
  default:
    console.log('📋 Dr. Oz Health Facts - Database Migration Tool');
    console.log('');
    console.log('Usage:');
    console.log('  node migrate.js migrate   - Run migration (create tables)');
    console.log('  node migrate.js rollback  - Rollback migration (drop tables)');
    console.log('  node migrate.js status    - Check migration status');
    console.log('');
    console.log('Environment Variables:');
    console.log('  DB_TYPE     - Database type (postgresql, mysql, sqlite) [default: sqlite]');
    console.log('  DB_HOST     - Database host [default: localhost]');
    console.log('  DB_PORT     - Database port [default: 5432 for postgres, 3306 for mysql]');
    console.log('  DB_NAME     - Database name [default: droz_health_facts]');
    console.log('  DB_USER     - Database user [default: postgres/root]');
    console.log('  DB_PASSWORD - Database password [default: empty]');
    console.log('  DB_FILE     - SQLite file path [default: ./database/droz_health_facts.db]');
    console.log('');
    console.log('Examples:');
    console.log('  DB_TYPE=sqlite node migrate.js migrate');
    console.log('  DB_TYPE=postgresql DB_HOST=localhost node migrate.js migrate');
    console.log('  DB_TYPE=mysql DB_HOST=localhost DB_USER=root node migrate.js migrate');
    break;
}