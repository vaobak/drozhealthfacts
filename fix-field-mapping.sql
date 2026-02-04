-- Fix Field Mapping Issues
-- This script ensures all fields are properly mapped and accessible

-- Check current table structure
.schema affiliate_links

-- Check if data exists and field mapping
SELECT 
    id,
    slug,
    title,
    destination_url,
    redirect_type,
    auto_redirect,
    created_at
FROM affiliate_links 
LIMIT 3;

-- If needed, we can add missing columns (though they should already exist)
-- ALTER TABLE affiliate_links ADD COLUMN destination_url TEXT;
-- ALTER TABLE affiliate_links ADD COLUMN redirect_type TEXT DEFAULT 'landing';
-- ALTER TABLE affiliate_links ADD COLUMN auto_redirect INTEGER DEFAULT 1;

-- Update any NULL values to defaults
UPDATE affiliate_links 
SET redirect_type = 'landing' 
WHERE redirect_type IS NULL;

UPDATE affiliate_links 
SET auto_redirect = 1 
WHERE auto_redirect IS NULL;

-- Verify the updates
SELECT 
    COUNT(*) as total_links,
    COUNT(destination_url) as has_destination_url,
    COUNT(redirect_type) as has_redirect_type,
    COUNT(auto_redirect) as has_auto_redirect
FROM affiliate_links;