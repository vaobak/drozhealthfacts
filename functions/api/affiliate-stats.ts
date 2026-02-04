// Cloudflare Pages Function - Affiliate Statistics API
interface Env {
  DB: D1Database;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
};

export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;
  const { DB } = env as Env;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Get total links
    const totalLinksResult = await DB.prepare('SELECT COUNT(*) as count FROM affiliate_links').first();
    const totalLinks = totalLinksResult?.count || 0;
    
    // Get active links
    const activeLinksResult = await DB.prepare('SELECT COUNT(*) as count FROM affiliate_links WHERE is_active = 1').first();
    const activeLinks = activeLinksResult?.count || 0;
    
    // Get total clicks
    const totalClicksResult = await DB.prepare('SELECT SUM(click_count) as total FROM affiliate_links').first();
    const totalClicks = totalClicksResult?.total || 0;
    
    // Get clicks last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const clicksLast30DaysResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM click_analytics 
      WHERE timestamp >= ?
    `).bind(thirtyDaysAgo.toISOString()).first();
    const clicksLast30Days = clicksLast30DaysResult?.count || 0;
    
    // Get top performing link
    const topLinkResult = await DB.prepare(`
      SELECT * FROM affiliate_links 
      ORDER BY click_count DESC 
      LIMIT 1
    `).first();
    
    const topPerformingLink = topLinkResult ? {
      ...topLinkResult,
      tags: topLinkResult.tags ? JSON.parse(topLinkResult.tags as string) : [],
      trustBadges: topLinkResult.trust_badges ? JSON.parse(topLinkResult.trust_badges as string) : [],
      isActive: Boolean(topLinkResult.is_active),
      autoRedirect: Boolean(topLinkResult.auto_redirect)
    } : null;
    
    const stats = {
      totalLinks,
      activeLinks,
      totalClicks,
      clicksLast30Days,
      topPerformingLink
    };
    
    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch statistics' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}