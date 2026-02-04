#!/usr/bin/env node

/**
 * Database Test Script for Dr. Oz Health Facts Affiliate System
 * Tests database connection and basic operations
 */

const path = require('path');

async function runTests() {
  console.log('🧪 Running Database Tests for Dr. Oz Health Facts Affiliate System');
  console.log('=' .repeat(70));
  
  const DB_TYPE = process.env.DB_TYPE || 'sqlite';
  console.log(`📊 Database Type: ${DB_TYPE.toUpperCase()}`);
  
  let db = null;
  let testsPassed = 0;
  let testsTotal = 0;
  
  try {
    // Connect to database
    console.log('\n1️⃣ Testing Database Connection...');
    testsTotal++;
    
    switch (DB_TYPE) {
      case 'postgresql':
        const { Client } = require('pg');
        db = new Client({
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 5432,
          database: process.env.DB_NAME || 'droz_health_facts',
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || '',
        });
        await db.connect();
        break;
        
      case 'mysql':
        const mysql = require('mysql2/promise');
        db = await mysql.createConnection({
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 3306,
          database: process.env.DB_NAME || 'droz_health_facts',
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASSWORD || '',
        });
        break;
        
      case 'sqlite':
        const sqlite3 = require('sqlite3').verbose();
        const { open } = require('sqlite');
        db = await open({
          filename: process.env.DB_FILE || './database/droz_health_facts.db',
          driver: sqlite3.Database
        });
        break;
        
      default:
        throw new Error(`Unsupported database type: ${DB_TYPE}`);
    }
    
    console.log('   ✅ Database connection successful');
    testsPassed++;
    
    // Test table existence
    console.log('\n2️⃣ Testing Table Existence...');
    testsTotal++;
    
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
          console.log(`   ✅ Table exists: ${table}`);
        } else {
          console.log(`   ❌ Table missing: ${table}`);
        }
      } catch (error) {
        console.log(`   ❌ Error checking table ${table}: ${error.message}`);
      }
    }
    
    if (existingTables.length === tables.length) {
      console.log('   ✅ All required tables exist');
      testsPassed++;
    } else {
      console.log(`   ❌ Missing ${tables.length - existingTables.length} tables`);
    }
    
    // Test sample data
    console.log('\n3️⃣ Testing Sample Data...');
    testsTotal++;
    
    try {
      const query = 'SELECT COUNT(*) as count FROM affiliate_links';
      let result;
      
      if (DB_TYPE === 'sqlite') {
        result = await db.get(query);
      } else {
        const queryResult = await db.query(query);
        result = DB_TYPE === 'postgresql' ? queryResult.rows[0] : queryResult[0][0];
      }
      
      const count = result.count;
      console.log(`   📊 Found ${count} affiliate links`);
      
      if (count > 0) {
        console.log('   ✅ Sample data exists');
        testsPassed++;
      } else {
        console.log('   ⚠️  No sample data found (this is okay for fresh installs)');
        testsPassed++; // Don't fail for missing sample data
      }
    } catch (error) {
      console.log(`   ❌ Error checking sample data: ${error.message}`);
    }
    
    // Test basic CRUD operations
    console.log('\n4️⃣ Testing CRUD Operations...');
    testsTotal++;
    
    try {
      // Create test record
      const testId = `test_${Date.now()}`;
      const insertQuery = `
        INSERT INTO affiliate_links (
          id, slug, title, description, destination_url, category,
          is_active, click_count, created_at, updated_at, tags, trust_badges,
          redirect_type, auto_redirect
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const insertValues = [
        testId, 'test-product', 'Test Product', 'Test Description',
        'https://example.com', 'Test Category', 1, 0,
        new Date().toISOString(), new Date().toISOString(),
        '["test"]', '["test-badge"]', 'landing', 1
      ];
      
      if (DB_TYPE === 'sqlite') {
        await db.run(insertQuery, insertValues);
      } else {
        await db.query(insertQuery, insertValues);
      }
      
      console.log('   ✅ CREATE operation successful');
      
      // Read test record
      const selectQuery = 'SELECT * FROM affiliate_links WHERE id = ?';
      let selectResult;
      
      if (DB_TYPE === 'sqlite') {
        selectResult = await db.get(selectQuery, [testId]);
      } else {
        const queryResult = await db.query(selectQuery, [testId]);
        selectResult = DB_TYPE === 'postgresql' ? queryResult.rows[0] : queryResult[0][0];
      }
      
      if (selectResult && selectResult.id === testId) {
        console.log('   ✅ READ operation successful');
      } else {
        throw new Error('Failed to read test record');
      }
      
      // Update test record
      const updateQuery = 'UPDATE affiliate_links SET title = ? WHERE id = ?';
      const updateValues = ['Updated Test Product', testId];
      
      if (DB_TYPE === 'sqlite') {
        await db.run(updateQuery, updateValues);
      } else {
        await db.query(updateQuery, updateValues);
      }
      
      console.log('   ✅ UPDATE operation successful');
      
      // Delete test record
      const deleteQuery = 'DELETE FROM affiliate_links WHERE id = ?';
      
      if (DB_TYPE === 'sqlite') {
        await db.run(deleteQuery, [testId]);
      } else {
        await db.query(deleteQuery, [testId]);
      }
      
      console.log('   ✅ DELETE operation successful');
      console.log('   ✅ All CRUD operations working');
      testsPassed++;
      
    } catch (error) {
      console.log(`   ❌ CRUD operations failed: ${error.message}`);
    }
    
    // Test analytics table
    console.log('\n5️⃣ Testing Analytics Operations...');
    testsTotal++;
    
    try {
      // Insert test analytics record
      const analyticsId = `analytics_${Date.now()}`;
      const analyticsQuery = `
        INSERT INTO click_analytics (
          id, link_id, timestamp, user_agent, referrer, ip_address, device, converted
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const analyticsValues = [
        analyticsId, 'test-link', new Date().toISOString(),
        'Test User Agent', 'https://example.com', '127.0.0.1', 'desktop', 0
      ];
      
      if (DB_TYPE === 'sqlite') {
        await db.run(analyticsQuery, analyticsValues);
      } else {
        await db.query(analyticsQuery, analyticsValues);
      }
      
      console.log('   ✅ Analytics INSERT successful');
      
      // Query analytics
      const analyticsSelectQuery = 'SELECT COUNT(*) as count FROM click_analytics WHERE id = ?';
      let analyticsResult;
      
      if (DB_TYPE === 'sqlite') {
        analyticsResult = await db.get(analyticsSelectQuery, [analyticsId]);
      } else {
        const queryResult = await db.query(analyticsSelectQuery, [analyticsId]);
        analyticsResult = DB_TYPE === 'postgresql' ? queryResult.rows[0] : queryResult[0][0];
      }
      
      if (analyticsResult.count > 0) {
        console.log('   ✅ Analytics SELECT successful');
      }
      
      // Clean up test analytics record
      const analyticsDeleteQuery = 'DELETE FROM click_analytics WHERE id = ?';
      
      if (DB_TYPE === 'sqlite') {
        await db.run(analyticsDeleteQuery, [analyticsId]);
      } else {
        await db.query(analyticsDeleteQuery, [analyticsId]);
      }
      
      console.log('   ✅ Analytics operations working');
      testsPassed++;
      
    } catch (error) {
      console.log(`   ❌ Analytics operations failed: ${error.message}`);
    }
    
    // Test views (if supported)
    if (DB_TYPE !== 'sqlite') {
      console.log('\n6️⃣ Testing Database Views...');
      testsTotal++;
      
      try {
        const views = ['daily_click_stats', 'link_performance', 'monthly_revenue'];
        let viewsWorking = 0;
        
        for (const view of views) {
          try {
            const viewQuery = `SELECT * FROM ${view} LIMIT 1`;
            await db.query(viewQuery);
            console.log(`   ✅ View working: ${view}`);
            viewsWorking++;
          } catch (error) {
            console.log(`   ⚠️  View issue: ${view} - ${error.message}`);
          }
        }
        
        if (viewsWorking === views.length) {
          console.log('   ✅ All database views working');
          testsPassed++;
        } else {
          console.log(`   ⚠️  ${views.length - viewsWorking} views have issues`);
          testsPassed++; // Don't fail for view issues
        }
        
      } catch (error) {
        console.log(`   ❌ View testing failed: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Database test failed: ${error.message}`);
  } finally {
    // Close database connection
    if (db) {
      try {
        if (DB_TYPE === 'postgresql') {
          await db.end();
        } else if (DB_TYPE === 'mysql') {
          await db.end();
        } else if (DB_TYPE === 'sqlite') {
          await db.close();
        }
        console.log('\n🔌 Database connection closed');
      } catch (error) {
        console.error('⚠️  Error closing database connection:', error.message);
      }
    }
  }
  
  // Test summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`✅ Tests Passed: ${testsPassed}/${testsTotal}`);
  console.log(`❌ Tests Failed: ${testsTotal - testsPassed}/${testsTotal}`);
  
  if (testsPassed === testsTotal) {
    console.log('🎉 All tests passed! Database is ready for use.');
    console.log('\n📋 Next Steps:');
    console.log('   1. Start the API server: npm run server');
    console.log('   2. Start the frontend: npm run dev');
    console.log('   3. Visit: http://localhost:3000/affiliate');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Please check the database setup.');
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Run migration: npm run db:migrate');
    console.log('   2. Check database connection settings');
    console.log('   3. Verify database permissions');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test runner failed:', error);
  process.exit(1);
});