// Simplified affiliate function with database support
interface Env {
  DB: D1Database;
}

export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;
  const { DB } = env as Env;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
  };
  
  console.log('=== SIMPLE AFFILIATE API WITH DB ===');
  console.log('Method:', request.method);
  console.log('URL:', request.url);
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    console.log('Handling CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    console.log('Path segments:', pathSegments);
    
    // Simple authentication for non-GET requests
    if (request.method !== 'GET') {
      const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
      const projectId = request.headers.get('X-Project-ID');
      
      if (apiKey !== 'droz-health-facts-api-key-2026' || projectId !== 'droz-health-facts') {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Handle different methods
    switch (request.method) {
      case 'GET':
        console.log('✅ GET request - fetching all links');
        const results = await DB.prepare('SELECT * FROM affiliate_links ORDER BY created_at DESC').all();
        const links = results.results.map((result: any) => ({
          ...result,
          destinationUrl: result.destination_url,
          redirectType: result.redirect_type,
          productImage: result.product_image,
          trustBadges: result.trust_badges ? JSON.parse(result.trust_badges) : [],
          tags: result.tags ? JSON.parse(result.tags) : [],
          isActive: Boolean(result.is_active),
          autoRedirect: Boolean(result.auto_redirect),
          clickCount: result.click_count,
          createdAt: result.created_at,
          updatedAt: result.updated_at,
          originalPrice: result.original_price
        }));
        
        return new Response(JSON.stringify(links), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
        
      case 'DELETE':
        console.log('✅ DELETE request');
        if (pathSegments.length < 3) {
          return new Response(JSON.stringify({ error: 'Missing ID' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        const deleteId = pathSegments[2];
        console.log('Deleting ID:', deleteId);
        
        const deleteResult = await DB.prepare('DELETE FROM affiliate_links WHERE id = ?').bind(deleteId).run();
        console.log('Delete result:', deleteResult);
        
        if (deleteResult.changes === 0) {
          return new Response(JSON.stringify({ error: 'Not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        return new Response(JSON.stringify({ success: true, message: 'Deleted successfully' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
        
      case 'PUT':
        console.log('✅ PUT request');
        if (pathSegments.length < 3) {
          return new Response(JSON.stringify({ error: 'Missing ID' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        const updateId = pathSegments[2];
        const updateData = await request.json();
        console.log('Updating ID:', updateId, 'with data:', updateData);
        
        const now = new Date().toISOString();
        const updateResult = await DB.prepare(`
          UPDATE affiliate_links 
          SET title = ?, description = ?, destination_url = ?, updated_at = ?
          WHERE id = ?
        `).bind(
          updateData.title || 'Updated Title',
          updateData.description || 'Updated Description', 
          updateData.destinationUrl || 'https://example.com',
          now,
          updateId
        ).run();
        
        console.log('Update result:', updateResult);
        
        if (updateResult.changes === 0) {
          return new Response(JSON.stringify({ error: 'Not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        return new Response(JSON.stringify({ success: true, message: 'Updated successfully' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
        
      default:
        return new Response(JSON.stringify({ error: 'Method not allowed', method: request.method }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}