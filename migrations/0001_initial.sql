-- Initial migration for Cloudflare D1
-- Dr. Oz Health Facts Affiliate System

-- ==========================================
-- AFFILIATE LINKS TABLE
-- ==========================================
CREATE TABLE affiliate_links (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    destination_url TEXT NOT NULL,
    product_image TEXT,
    category TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    click_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    expiry_date TEXT,
    tags TEXT, -- JSON array stored as text
    trust_badges TEXT, -- JSON array stored as text
    price TEXT,
    original_price TEXT,
    discount TEXT,
    redirect_type TEXT DEFAULT 'landing', -- 'landing' or 'direct'
    auto_redirect INTEGER DEFAULT 1
);

-- Indexes for performance
CREATE INDEX idx_affiliate_links_slug ON affiliate_links(slug);
CREATE INDEX idx_affiliate_links_active ON affiliate_links(is_active);
CREATE INDEX idx_affiliate_links_category ON affiliate_links(category);
CREATE INDEX idx_affiliate_links_created ON affiliate_links(created_at);

-- ==========================================
-- CLICK ANALYTICS TABLE
-- ==========================================
CREATE TABLE click_analytics (
    id TEXT PRIMARY KEY,
    link_id TEXT NOT NULL,
    timestamp TEXT DEFAULT (datetime('now')),
    user_agent TEXT,
    referrer TEXT,
    ip_address TEXT, -- For privacy, can be 'hidden'
    country TEXT, -- ISO country code
    device TEXT, -- 'mobile', 'desktop', 'tablet'
    converted INTEGER DEFAULT 0,
    FOREIGN KEY (link_id) REFERENCES affiliate_links(id) ON DELETE CASCADE
);

-- Indexes for analytics performance
CREATE INDEX idx_click_analytics_link_id ON click_analytics(link_id);
CREATE INDEX idx_click_analytics_timestamp ON click_analytics(timestamp);
CREATE INDEX idx_click_analytics_device ON click_analytics(device);

-- ==========================================
-- SAMPLE DATA
-- ==========================================

-- Insert sample affiliate links
INSERT INTO affiliate_links (
    id, slug, title, description, destination_url, product_image, category,
    is_active, click_count, tags, trust_badges, price, original_price, 
    discount, redirect_type, auto_redirect
) VALUES 
(
    'sample-1',
    'formula99',
    'Formula 99 - Ultimate Weight Loss Supplement',
    'Revolutionary weight loss formula recommended by health experts. Natural ingredients, proven results.',
    'https://www.digistore24.com/redir/472943/waners/',
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop',
    'Weight Loss',
    1,
    0,
    '["weight-loss", "supplement", "natural"]',
    '["FDA Approved", "Doctor Recommended", "30-Day Guarantee"]',
    '$49.99',
    '$79.99',
    '37% OFF',
    'landing',
    0
),
(
    'sample-2',
    'immune-booster-pro',
    'Immune Booster Pro - Advanced Immunity Support',
    'Strengthen your immune system with this powerful blend of vitamins and natural extracts.',
    'https://affstore.com/immune-booster',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    'Immune Support',
    1,
    0,
    '["immunity", "vitamins", "health"]',
    '["Clinically Tested", "Natural Ingredients"]',
    '$39.99',
    '$59.99',
    '33% OFF',
    'direct',
    1
),
(
    'sample-3',
    'keto-burn-max',
    'Keto Burn Max - Ketosis Fat Burner',
    'Accelerate ketosis and burn fat faster with this advanced keto supplement formula.',
    'https://example.com/keto-burn',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'Keto & Fat Burning',
    1,
    0,
    '["keto", "fat-burner", "metabolism"]',
    '["Keto Certified", "Money Back Guarantee"]',
    '$44.99',
    '$69.99',
    '36% OFF',
    'landing',
    1
);