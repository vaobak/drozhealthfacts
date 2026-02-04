// Cloudflare Pages Function - Click Analytics API
interface Env {
  DB: D1Database;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
};

export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;
  const { DB } = env as Env;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    switch (request.method) {
      case 'GET':
        return await handleGet(DB, request);
      case 'POST':
        return await handlePost(DB, request);
      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Analytics API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// GET - Fetch click analytics
async function handleGet(DB: D1Database, request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const linkId = url.searchParams.get('linkId');
    
    let query = 'SELECT * FROM click_analytics';
    let params: any[] = [];
    
    if (linkId) {
      query += ' WHERE link_id = ?';
      params.push(linkId);
    }
    
    query += ' ORDER BY timestamp DESC LIMIT 1000';
    
    const results = await DB.prepare(query).bind(...params).all();
    
    return new Response(JSON.stringify(results.results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('GET Analytics Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch analytics' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// POST - Track click
async function handlePost(DB: D1Database, request: Request): Promise<Response> {
  try {
    const data = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    // Insert click analytics
    await DB.prepare(`
      INSERT INTO click_analytics (
        id, link_id, timestamp, user_agent, referrer, ip_address, device, converted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, data.linkId, now, data.userAgent || '', data.referrer || '',
      data.ipAddress || 'hidden', data.device || 'unknown', data.converted ? 1 : 0
    ).run();
    
    // Increment click count in affiliate_links
    await DB.prepare(`
      UPDATE affiliate_links 
      SET click_count = click_count + 1, updated_at = ? 
      WHERE id = ?
    `).bind(now, data.linkId).run();
    
    return new Response(JSON.stringify({ success: true, message: 'Click tracked' }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('POST Analytics Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to track click' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}