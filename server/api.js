#!/usr/bin/env node

/**
 * Simple API Server for Dr. Oz Health Facts Affiliate System
 * Provides REST endpoints for cloud database operations
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

// Database connection (will be initialized based on DB_TYPE)
let db = null;

// Express app setup
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'https://drozhealthfacts.com'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// API Key authentication middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  const projectId = req.headers['x-project-id'];
  
  if (!apiKey || !projectId) {
    return res.status(401).json({ error: 'Missing API key or project ID' });
  }
  
  // Simple API key validation (in production, use proper JWT or OAuth)
  const validApiKey = process.env.API_KEY || 'droz-health-facts-api-key-2026';
  const validProjectId = process.env.PROJECT_ID || 'droz-health-facts';
  
  if (apiKey !== validApiKey || projectId !== validProjectId) {
    return res.status(401).json({ error: 'Invalid API key or project ID' });
  }
  
  next();
};

// Apply authentication to all API routes
app.use('/api/', authenticateApiKey);

// ==========================================
// HEALTH CHECK ENDPOINT
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: db ? 'connected' : 'disconnected'
  });
});

// ==========================================
// AFFILIATE LINKS ENDPOINTS
// ==========================================

// Get all affiliate links
app.get('/api/affiliate-links', async (req, res) => {
  try {
    const links = await getAllAffiliateLinks();
    res.json(links);
  } catch (error) {
    console.error('Error fetching affiliate links:', error);
    res.status(500).json({ error: 'Failed to fetch affiliate links' });
  }
});

// Get affiliate link by slug
app.get('/api/affiliate-links/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const link = await getAffiliateLinkBySlug(slug);
    
    if (!link) {
      return res.status(404).json({ error: 'Affiliate link not found' });
    }
    
    res.json(link);
  } catch (error) {
    console.error('Error fetching affiliate link by slug:', error);
    res.status(500).json({ error: 'Failed to fetch affiliate link' });
  }
});

// Create new affiliate link
app.post('/api/affiliate-links', async (req, res) => {
  try {
    const linkData = {
      ...req.body,
      id: uuidv4(),
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const newLink = await createAffiliateLink(linkData);
    res.status(201).json(newLink);
  } catch (error) {
    console.error('Error creating affiliate link:', error);
    res.status(500).json({ error: 'Failed to create affiliate link' });
  }
});

// Update affiliate link
app.put('/api/affiliate-links/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    const updated = await updateAffiliateLink(id, updates);
    
    if (!updated) {
      return res.status(404).json({ error: 'Affiliate link not found' });
    }
    
    res.json({ success: true, message: 'Affiliate link updated' });
  } catch (error) {
    console.error('Error updating affiliate link:', error);
    res.status(500).json({ error: 'Failed to update affiliate link' });
  }
});

// Delete affiliate link
app.delete('/api/affiliate-links/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteAffiliateLink(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Affiliate link not found' });
    }
    
    res.json({ success: true, message: 'Affiliate link deleted' });
  } catch (error) {
    console.error('Error deleting affiliate link:', error);
    res.status(500).json({ error: 'Failed to delete affiliate link' });
  }
});

// Increment click count
app.post('/api/affiliate-links/:id/increment-clicks', async (req, res) => {
  try {
    const { id } = req.params;
    await incrementClickCount(id);
    res.json({ success: true, message: 'Click count incremented' });
  } catch (error) {
    console.error('Error incrementing click count:', error);
    res.status(500).json({ error: 'Failed to increment click count' });
  }
});

// ==========================================
// CLICK ANALYTICS ENDPOINTS
// ==========================================

// Get click analytics
app.get('/api/click-analytics', async (req, res) => {
  try {
    const { linkId } = req.query;
    const analytics = await getClickAnalytics(linkId);
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching click analytics:', error);
    res.status(500).json({ error: 'Failed to fetch click analytics' });
  }
});

// Track click
app.post('/api/click-analytics', async (req, res) => {
  try {
    const clickData = {
      ...req.body,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ipAddress: req.ip || 'unknown'
    };
    
    await trackClick(clickData);
    res.status(201).json({ success: true, message: 'Click tracked' });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

// ==========================================
// STATISTICS ENDPOINTS
// ==========================================

// Get affiliate statistics
app.get('/api/affiliate-stats', async (req, res) => {
  try {
    const stats = await getAffiliateStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching affiliate stats:', error);
    res.status(500).json({ error: 'Failed to fetch affiliate stats' });
  }
});

// ==========================================
// SYNC ENDPOINTS
// ==========================================

// Sync affiliate links
app.post('/api/affiliate-links/sync', async (req, res) => {
  try {
    const linkData = req.body;
    await syncAffiliateLink(linkData);
    res.json({ success: true, message: 'Affiliate link synced' });
  } catch (error) {
    console.error('Error syncing affiliate link:', error);
    res.status(500).json({ error: 'Failed to sync affiliate link' });
  }
});

// Sync click analytics
app.post('/api/click-analytics/sync', async (req, res) => {
  try {
    const analyticsData = req.body;
    await syncClickAnalytics(analyticsData);
    res.json({ success: true, message: 'Click analytics synced' });
  } catch (error) {
    console.error('Error syncing click analytics:', error);
    res.status(500).json({ error: 'Failed to sync click analytics' });
  }
});

// ==========================================
// DATABASE FUNCTIONS
// ==========================================

async function initializeDatabase() {
  const DB_TYPE = process.env.DB_TYPE || 'sqlite';
  
  try {
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
    
    console.log(`✅ Connected to ${DB_TYPE.toUpperCase()} database`);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

async function getAllAffiliateLinks() {
  const query = 'SELECT * FROM affiliate_links ORDER BY created_at DESC';
  
  if (process.env.DB_TYPE === 'sqlite') {
    return await db.all(query);
  } else {
    const result = await db.query(query);
    return process.env.DB_TYPE === 'postgresql' ? result.rows : result[0];
  }
}

async function getAffiliateLinkBySlug(slug) {
  const query = 'SELECT * FROM affiliate_links WHERE slug = ? AND is_active = 1';
  
  if (process.env.DB_TYPE === 'sqlite') {
    return await db.get(query, [slug]);
  } else {
    const result = await db.query(query, [slug]);
    const rows = process.env.DB_TYPE === 'postgresql' ? result.rows : result[0];
    return rows.length > 0 ? rows[0] : null;
  }
}

async function createAffiliateLink(linkData) {
  const query = `
    INSERT INTO affiliate_links (
      id, slug, title, description, destination_url, product_image, category,
      is_active, click_count, created_at, updated_at, tags, trust_badges,
      price, original_price, discount, redirect_type, auto_redirect
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    linkData.id, linkData.slug, linkData.title, linkData.description,
    linkData.destinationUrl, linkData.productImage, linkData.category,
    linkData.isActive ? 1 : 0, linkData.clickCount, linkData.createdAt,
    linkData.updatedAt, JSON.stringify(linkData.tags || []),
    JSON.stringify(linkData.trustBadges || []), linkData.price,
    linkData.originalPrice, linkData.discount, linkData.redirectType,
    linkData.autoRedirect ? 1 : 0
  ];
  
  if (process.env.DB_TYPE === 'sqlite') {
    await db.run(query, values);
  } else {
    await db.query(query, values);
  }
  
  return linkData;
}

async function updateAffiliateLink(id, updates) {
  const setClause = Object.keys(updates)
    .map(key => `${key} = ?`)
    .join(', ');
  
  const query = `UPDATE affiliate_links SET ${setClause} WHERE id = ?`;
  const values = [...Object.values(updates), id];
  
  if (process.env.DB_TYPE === 'sqlite') {
    const result = await db.run(query, values);
    return result.changes > 0;
  } else {
    const result = await db.query(query, values);
    return process.env.DB_TYPE === 'postgresql' ? result.rowCount > 0 : result[0].affectedRows > 0;
  }
}

async function deleteAffiliateLink(id) {
  const query = 'DELETE FROM affiliate_links WHERE id = ?';
  
  if (process.env.DB_TYPE === 'sqlite') {
    const result = await db.run(query, [id]);
    return result.changes > 0;
  } else {
    const result = await db.query(query, [id]);
    return process.env.DB_TYPE === 'postgresql' ? result.rowCount > 0 : result[0].affectedRows > 0;
  }
}

async function incrementClickCount(id) {
  const query = 'UPDATE affiliate_links SET click_count = click_count + 1, updated_at = ? WHERE id = ?';
  const values = [new Date().toISOString(), id];
  
  if (process.env.DB_TYPE === 'sqlite') {
    await db.run(query, values);
  } else {
    await db.query(query, values);
  }
}

async function getClickAnalytics(linkId) {
  let query = 'SELECT * FROM click_analytics';
  let values = [];
  
  if (linkId) {
    query += ' WHERE link_id = ?';
    values = [linkId];
  }
  
  query += ' ORDER BY timestamp DESC LIMIT 1000';
  
  if (process.env.DB_TYPE === 'sqlite') {
    return await db.all(query, values);
  } else {
    const result = await db.query(query, values);
    return process.env.DB_TYPE === 'postgresql' ? result.rows : result[0];
  }
}

async function trackClick(clickData) {
  const query = `
    INSERT INTO click_analytics (
      id, link_id, timestamp, user_agent, referrer, ip_address, device, converted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    clickData.id, clickData.linkId, clickData.timestamp, clickData.userAgent,
    clickData.referrer, clickData.ipAddress, clickData.device, clickData.converted ? 1 : 0
  ];
  
  if (process.env.DB_TYPE === 'sqlite') {
    await db.run(query, values);
  } else {
    await db.query(query, values);
  }
}

async function getAffiliateStats() {
  const queries = {
    totalLinks: 'SELECT COUNT(*) as count FROM affiliate_links',
    activeLinks: 'SELECT COUNT(*) as count FROM affiliate_links WHERE is_active = 1',
    totalClicks: 'SELECT SUM(click_count) as total FROM affiliate_links',
    clicksLast30Days: `
      SELECT COUNT(*) as count FROM click_analytics 
      WHERE timestamp >= datetime('now', '-30 days')
    `
  };
  
  const stats = {};
  
  for (const [key, query] of Object.entries(queries)) {
    if (process.env.DB_TYPE === 'sqlite') {
      const result = await db.get(query);
      stats[key] = result.count || result.total || 0;
    } else {
      const result = await db.query(query);
      const row = process.env.DB_TYPE === 'postgresql' ? result.rows[0] : result[0][0];
      stats[key] = row.count || row.total || 0;
    }
  }
  
  return stats;
}

async function syncAffiliateLink(linkData) {
  // Check if link exists
  const existing = await getAffiliateLinkBySlug(linkData.slug);
  
  if (existing) {
    // Update existing
    await updateAffiliateLink(existing.id, linkData);
  } else {
    // Create new
    await createAffiliateLink({
      ...linkData,
      id: linkData.id || uuidv4()
    });
  }
}

async function syncClickAnalytics(analyticsData) {
  const query = `
    INSERT OR IGNORE INTO click_analytics (
      id, link_id, timestamp, user_agent, referrer, ip_address, device, converted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    analyticsData.id, analyticsData.linkId, analyticsData.timestamp,
    analyticsData.userAgent, analyticsData.referrer, analyticsData.ipAddress,
    analyticsData.device, analyticsData.converted ? 1 : 0
  ];
  
  if (process.env.DB_TYPE === 'sqlite') {
    await db.run(query, values);
  } else {
    // For PostgreSQL/MySQL, use ON CONFLICT/ON DUPLICATE KEY
    await db.query(query, values);
  }
}

// ==========================================
// SERVER STARTUP
// ==========================================

async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log('🚀 Dr. Oz Health Facts API Server');
      console.log(`📡 Server running on port ${PORT}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
      console.log(`💾 Database: ${process.env.DB_TYPE || 'sqlite'}`);
      console.log(`🔑 API Key required: ${process.env.API_KEY ? 'Yes' : 'No (using default)'}`);
      console.log('');
      console.log('📋 Available Endpoints:');
      console.log('   GET    /api/health');
      console.log('   GET    /api/affiliate-links');
      console.log('   POST   /api/affiliate-links');
      console.log('   PUT    /api/affiliate-links/:id');
      console.log('   DELETE /api/affiliate-links/:id');
      console.log('   GET    /api/click-analytics');
      console.log('   POST   /api/click-analytics');
      console.log('   GET    /api/affiliate-stats');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  
  if (db) {
    try {
      if (process.env.DB_TYPE === 'postgresql') {
        await db.end();
      } else if (process.env.DB_TYPE === 'mysql') {
        await db.end();
      } else if (process.env.DB_TYPE === 'sqlite') {
        await db.close();
      }
      console.log('✅ Database connection closed');
    } catch (error) {
      console.error('❌ Error closing database:', error);
    }
  }
  
  process.exit(0);
});

// Start the server
startServer();