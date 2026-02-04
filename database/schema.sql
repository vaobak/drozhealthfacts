-- Database Schema for Dr. Oz Health Facts Affiliate System
-- Compatible with PostgreSQL, MySQL, and SQLite

-- ==========================================
-- AFFILIATE LINKS TABLE
-- ==========================================
CREATE TABLE affiliate_links (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    destination_url TEXT NOT NULL,
    product_image VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP NULL,
    tags TEXT, -- JSON array stored as text
    trust_badges TEXT, -- JSON array stored as text
    price VARCHAR(20),
    original_price VARCHAR(20),
    discount VARCHAR(20),
    redirect_type VARCHAR(20) DEFAULT 'landing', -- 'landing' or 'direct'
    auto_redirect BOOLEAN DEFAULT true
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
    id VARCHAR(50) PRIMARY KEY,
    link_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    referrer VARCHAR(500),
    ip_address VARCHAR(45), -- IPv6 compatible
    country VARCHAR(2), -- ISO country code
    device VARCHAR(20), -- 'mobile', 'desktop', 'tablet'
    converted BOOLEAN DEFAULT false,
    conversion_value DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (link_id) REFERENCES affiliate_links(id) ON DELETE CASCADE
);

-- Indexes for analytics performance
CREATE INDEX idx_click_analytics_link_id ON click_analytics(link_id);
CREATE INDEX idx_click_analytics_timestamp ON click_analytics(timestamp);
CREATE INDEX idx_click_analytics_device ON click_analytics(device);
CREATE INDEX idx_click_analytics_country ON click_analytics(country);

-- ==========================================
-- USER SESSIONS TABLE (for admin authentication)
-- ==========================================
CREATE TABLE user_sessions (
    id VARCHAR(50) PRIMARY KEY,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Indexes for session management
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active);

-- ==========================================
-- LOGIN ATTEMPTS TABLE (for security)
-- ==========================================
CREATE TABLE login_attempts (
    id VARCHAR(50) PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN DEFAULT false,
    user_agent TEXT,
    blocked_until TIMESTAMP NULL
);

-- Indexes for security monitoring
CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX idx_login_attempts_time ON login_attempts(attempt_time);
CREATE INDEX idx_login_attempts_blocked ON login_attempts(blocked_until);

-- ==========================================
-- CONVERSION TRACKING TABLE
-- ==========================================
CREATE TABLE conversions (
    id VARCHAR(50) PRIMARY KEY,
    click_id VARCHAR(50) NOT NULL,
    link_id VARCHAR(50) NOT NULL,
    conversion_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    conversion_value DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    commission_rate DECIMAL(5,2) DEFAULT 0,
    commission_amount DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    FOREIGN KEY (click_id) REFERENCES click_analytics(id) ON DELETE CASCADE,
    FOREIGN KEY (link_id) REFERENCES affiliate_links(id) ON DELETE CASCADE
);

-- Indexes for conversion tracking
CREATE INDEX idx_conversions_link_id ON conversions(link_id);
CREATE INDEX idx_conversions_time ON conversions(conversion_time);
CREATE INDEX idx_conversions_status ON conversions(status);

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
    '1',
    'formula99',
    'Formula 99 - Ultimate Weight Loss Supplement',
    'Revolutionary weight loss formula recommended by health experts. Natural ingredients, proven results.',
    'https://www.digistore24.com/redir/472943/waners/',
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop',
    'Weight Loss',
    true,
    0,
    '["weight-loss", "supplement", "natural"]',
    '["FDA Approved", "Doctor Recommended", "30-Day Guarantee"]',
    '$49.99',
    '$79.99',
    '37% OFF',
    'landing',
    false
),
(
    '2',
    'immune-booster-pro',
    'Immune Booster Pro - Advanced Immunity Support',
    'Strengthen your immune system with this powerful blend of vitamins and natural extracts.',
    'https://affstore.com/immune-booster',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    'Immune Support',
    true,
    0,
    '["immunity", "vitamins", "health"]',
    '["Clinically Tested", "Natural Ingredients"]',
    '$39.99',
    '$59.99',
    '33% OFF',
    'direct',
    true
),
(
    '3',
    'keto-burn-max',
    'Keto Burn Max - Ketosis Fat Burner',
    'Accelerate ketosis and burn fat faster with this advanced keto supplement formula.',
    'https://example.com/keto-burn',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'Keto & Fat Burning',
    true,
    0,
    '["keto", "fat-burner", "metabolism"]',
    '["Keto Certified", "Money Back Guarantee"]',
    '$44.99',
    '$69.99',
    '36% OFF',
    'landing',
    true
);

-- ==========================================
-- VIEWS FOR ANALYTICS
-- ==========================================

-- Daily click statistics
CREATE VIEW daily_click_stats AS
SELECT 
    DATE(timestamp) as date,
    COUNT(*) as total_clicks,
    COUNT(DISTINCT link_id) as unique_links,
    COUNT(CASE WHEN device = 'mobile' THEN 1 END) as mobile_clicks,
    COUNT(CASE WHEN device = 'desktop' THEN 1 END) as desktop_clicks,
    COUNT(CASE WHEN device = 'tablet' THEN 1 END) as tablet_clicks
FROM click_analytics
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Link performance summary
CREATE VIEW link_performance AS
SELECT 
    al.id,
    al.slug,
    al.title,
    al.category,
    al.click_count,
    COUNT(ca.id) as analytics_clicks,
    COUNT(c.id) as conversions,
    COALESCE(SUM(c.conversion_value), 0) as total_revenue,
    COALESCE(AVG(c.conversion_value), 0) as avg_conversion_value,
    CASE 
        WHEN COUNT(ca.id) > 0 THEN (COUNT(c.id) * 100.0 / COUNT(ca.id))
        ELSE 0 
    END as conversion_rate
FROM affiliate_links al
LEFT JOIN click_analytics ca ON al.id = ca.link_id
LEFT JOIN conversions c ON al.id = c.link_id AND c.status = 'confirmed'
WHERE al.is_active = true
GROUP BY al.id, al.slug, al.title, al.category, al.click_count
ORDER BY al.click_count DESC;

-- Monthly revenue report
CREATE VIEW monthly_revenue AS
SELECT 
    DATE_TRUNC('month', conversion_time) as month,
    COUNT(*) as total_conversions,
    SUM(conversion_value) as total_revenue,
    AVG(conversion_value) as avg_conversion_value,
    SUM(commission_amount) as total_commission
FROM conversions
WHERE status = 'confirmed'
GROUP BY DATE_TRUNC('month', conversion_time)
ORDER BY month DESC;

-- ==========================================
-- STORED PROCEDURES (PostgreSQL)
-- ==========================================

-- Function to increment click count
CREATE OR REPLACE FUNCTION increment_click_count(link_id_param VARCHAR(50))
RETURNS VOID AS $$
BEGIN
    UPDATE affiliate_links 
    SET click_count = click_count + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = link_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to get link statistics
CREATE OR REPLACE FUNCTION get_link_stats(link_id_param VARCHAR(50))
RETURNS TABLE(
    total_clicks BIGINT,
    clicks_today BIGINT,
    clicks_this_week BIGINT,
    clicks_this_month BIGINT,
    conversion_rate NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_clicks,
        COUNT(CASE WHEN DATE(timestamp) = CURRENT_DATE THEN 1 END) as clicks_today,
        COUNT(CASE WHEN timestamp >= DATE_TRUNC('week', CURRENT_DATE) THEN 1 END) as clicks_this_week,
        COUNT(CASE WHEN timestamp >= DATE_TRUNC('month', CURRENT_DATE) THEN 1 END) as clicks_this_month,
        CASE 
            WHEN COUNT(*) > 0 THEN 
                (SELECT COUNT(*) FROM conversions WHERE link_id = link_id_param AND status = 'confirmed') * 100.0 / COUNT(*)
            ELSE 0 
        END as conversion_rate
    FROM click_analytics
    WHERE link_id = link_id_param;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ==========================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to affiliate_links table
CREATE TRIGGER update_affiliate_links_updated_at
    BEFORE UPDATE ON affiliate_links
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- SECURITY POLICIES (Row Level Security)
-- ==========================================

-- Enable RLS on sensitive tables
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Policy for affiliate links (admin only for modifications)
CREATE POLICY affiliate_links_select_policy ON affiliate_links
    FOR SELECT USING (is_active = true);

CREATE POLICY affiliate_links_admin_policy ON affiliate_links
    FOR ALL USING (current_user = 'admin');

-- ==========================================
-- CLEANUP PROCEDURES
-- ==========================================

-- Clean old analytics data (keep last 2 years)
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS VOID AS $$
BEGIN
    DELETE FROM click_analytics 
    WHERE timestamp < CURRENT_DATE - INTERVAL '2 years';
    
    DELETE FROM login_attempts 
    WHERE attempt_time < CURRENT_DATE - INTERVAL '90 days';
    
    DELETE FROM user_sessions 
    WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-analytics', '0 2 * * 0', 'SELECT cleanup_old_analytics();');