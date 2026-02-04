// Cloudflare Pages Function - Affiliate Links by ID API
interface Env {
  DB: D1Database;
}

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
};

// Authentication middleware
function authenticate(request: Request): boolean {
  const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
  const projectId = request.headers.get('X-Project-ID');
  
  console.log('Authentication check for ID endpoint:');
  console.log('- Received API Key:', apiKey);
  console.log('- Received Project ID:', projectId);
  
  const validApiKey = 'droz-health-facts-api-key-2026';
  const validProjectId = 'droz-health-facts';
  
  const isValid = apiKey === validApiKey && projectId === validProjectId;
  console.log('- Authentication result:', isValid);
  
  return isValid;
}

export async function onRequest(context: any): Promise<Response> {
  const { request, env, params } = context;
  const { DB } = env as Env;
  const id = params.id;
  
  console.log('=== AFFILIATE LINK BY ID API ===');
  console.log('Method:', request.method);
  console.log('ID:', id);
  console.log('URL:', request.url);
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    console.log('Handling CORS preflight for ID endpoint');
    return new Response(null, { headers: corsHeaders });
  }
  
  // Authentication (skip for GET requests to allow public access)
  if (request.method !== 'GET' && !authenticate(request)) {
    console.log('Authentication failed for ID endpoint');
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  try {
    switch (request.method) {
      case 'GET':
        return await handleGetById(DB, id);
      case 'PUT':
        return await handlePutById(DB, request, id);
      case 'DELETE':
        return await handleDeleteById(DB, id);
      case 'PATCH':
        return await handlePatchById(DB, request, id);
      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('API Error in ID endpoint:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// GET by ID
async function handleGetById(DB: D1Database, id: string): Promise<Response> {
  try {
    console.log('Getting affiliate link by ID:', id);
    
    const result = await DB.prepare(
      'SELECT * FROM affiliate_links WHERE id = ?'
    ).bind(id).first();
    
    if (!result) {
      return new Response(JSON.stringify({ error: 'Affiliate link not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Parse JSON fields and map database fields to frontend format
    const link = {
      ...result,
      destinationUrl: result.destination_url,
      redirectType: result.redirect_type,
      productImage: result.product_image,
      trustBadges: result.trust_badges ? JSON.parse(result.trust_badges as string) : [],
      tags: result.tags ? JSON.parse(result.tags as string) : [],
      isActive: Boolean(result.is_active),
      autoRedirect: Boolean(result.auto_redirect),
      clickCount: result.click_count,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      originalPrice: result.original_price
    };
    
    return new Response(JSON.stringify(link), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('GET by ID Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch affiliate link' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// PUT by ID - Update affiliate link
async function handlePutById(DB: D1Database, request: Request, id: string): Promise<Response> {
  try {
    const data = await request.json();
    const now = new Date().toISOString();
    
    console.log('Updating affiliate link by ID:', id, 'with data:', data);
    
    // Build dynamic update query
    const updateFields = [];
    const values = [];
    
    if (data.slug !== undefined) { updateFields.push('slug = ?'); values.push(data.slug); }
    if (data.title !== undefined) { updateFields.push('title = ?'); values.push(data.title); }
    if (data.description !== undefined) { updateFields.push('description = ?'); values.push(data.description); }
    if (data.destinationUrl !== undefined) { updateFields.push('destination_url = ?'); values.push(data.destinationUrl); }
    if (data.productImage !== undefined) { updateFields.push('product_image = ?'); values.push(data.productImage); }
    if (data.category !== undefined) { updateFields.push('category = ?'); values.push(data.category); }
    if (data.isActive !== undefined) { updateFields.push('is_active = ?'); values.push(data.isActive ? 1 : 0); }
    if (data.tags !== undefined) { updateFields.push('tags = ?'); values.push(JSON.stringify(data.tags)); }
    if (data.trustBadges !== undefined) { updateFields.push('trust_badges = ?'); values.push(JSON.stringify(data.trustBadges)); }
    if (data.price !== undefined) { updateFields.push('price = ?'); values.push(data.price); }
    if (data.originalPrice !== undefined) { updateFields.push('original_price = ?'); values.push(data.originalPrice); }
    if (data.discount !== undefined) { updateFields.push('discount = ?'); values.push(data.discount); }
    if (data.redirectType !== undefined) { updateFields.push('redirect_type = ?'); values.push(data.redirectType); }
    if (data.autoRedirect !== undefined) { updateFields.push('auto_redirect = ?'); values.push(data.autoRedirect ? 1 : 0); }
    
    updateFields.push('updated_at = ?');
    values.push(now);
    values.push(id);
    
    console.log('Update query fields:', updateFields);
    console.log('Update query values:', values);
    
    const result = await DB.prepare(`
      UPDATE affiliate_links SET ${updateFields.join(', ')} WHERE id = ?
    `).bind(...values).run();
    
    console.log('Update result:', result);
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: 'Affiliate link not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Affiliate link updated successfully',
      changes: result.changes 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('PUT by ID Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update affiliate link',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// DELETE by ID
async function handleDeleteById(DB: D1Database, id: string): Promise<Response> {
  try {
    console.log('Deleting affiliate link by ID:', id);
    
    const result = await DB.prepare('DELETE FROM affiliate_links WHERE id = ?').bind(id).run();
    
    console.log('Delete result:', result);
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: 'Affiliate link not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Affiliate link deleted successfully',
      changes: result.changes 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('DELETE by ID Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to delete affiliate link',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// PATCH by ID - Increment click count
async function handlePatchById(DB: D1Database, request: Request, id: string): Promise<Response> {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    
    if (action === 'increment-clicks') {
      console.log('Incrementing click count for ID:', id);
      
      const now = new Date().toISOString();
      const result = await DB.prepare(`
        UPDATE affiliate_links 
        SET click_count = click_count + 1, updated_at = ? 
        WHERE id = ?
      `).bind(now, id).run();
      
      if (result.changes === 0) {
        return new Response(JSON.stringify({ error: 'Affiliate link not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Click count incremented',
        changes: result.changes 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid PATCH action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('PATCH by ID Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to patch affiliate link',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}