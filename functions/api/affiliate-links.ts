// Cloudflare Pages Function - Affiliate Links API
interface Env {
  DB: D1Database;
}

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
};

// Authentication middleware
function authenticate(request: Request): boolean {
  const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
  const projectId = request.headers.get('X-Project-ID');
  
  const validApiKey = 'droz-health-facts-api-key-2026';
  const validProjectId = 'droz-health-facts';
  
  return apiKey === validApiKey && projectId === validProjectId;
}

export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;
  const { DB } = env as Env;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Authentication (skip for GET requests to allow public access)
  if (request.method !== 'GET' && !authenticate(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    
    switch (request.method) {
      case 'GET':
        return await handleGet(DB, pathSegments);
      case 'POST':
        return await handlePost(DB, request);
      case 'PUT':
        return await handlePut(DB, request, pathSegments);
      case 'DELETE':
        return await handleDelete(DB, pathSegments);
      case 'PATCH':
        return await handlePatch(DB, request, pathSegments);
      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// GET - Fetch affiliate links
async function handleGet(DB: D1Database, pathSegments: string[]): Promise<Response> {
  try {
    // Check if requesting by slug: /api/affiliate-links/slug/formula99
    if (pathSegments.length >= 4 && pathSegments[2] === 'slug') {
      const slug = pathSegments[3];
      const result = await DB.prepare(
        'SELECT * FROM affiliate_links WHERE slug = ? AND is_active = 1'
      ).bind(slug).first();
      
      if (!result) {
        return new Response(JSON.stringify({ error: 'Affiliate link not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Parse JSON fields
      const link = {
        ...result,
        tags: result.tags ? JSON.parse(result.tags as string) : [],
        trustBadges: result.trust_badges ? JSON.parse(result.trust_badges as string) : [],
        isActive: Boolean(result.is_active),
        autoRedirect: Boolean(result.auto_redirect)
      };
      
      return new Response(JSON.stringify(link), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Get all affiliate links
    const results = await DB.prepare(
      'SELECT * FROM affiliate_links ORDER BY created_at DESC'
    ).all();
    
    const links = results.results.map((result: any) => ({
      ...result,
      tags: result.tags ? JSON.parse(result.tags) : [],
      trustBadges: result.trust_badges ? JSON.parse(result.trust_badges) : [],
      isActive: Boolean(result.is_active),
      autoRedirect: Boolean(result.auto_redirect)
    }));
    
    return new Response(JSON.stringify(links), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('GET Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch affiliate links' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// POST - Create affiliate link
async function handlePost(DB: D1Database, request: Request): Promise<Response> {
  try {
    const data = await request.json();
    console.log('Received affiliate link data:', data);
    
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    // Validate required fields
    if (!data.slug || !data.title || !data.description || !data.destinationUrl || !data.category) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: slug, title, description, destinationUrl, category' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log('Inserting affiliate link with data:', {
      id, 
      slug: data.slug, 
      title: data.title, 
      description: data.description, 
      destinationUrl: data.destinationUrl,
      productImage: data.productImage || null, 
      category: data.category,
      isActive: data.isActive ? 1 : 0, 
      tags: JSON.stringify(data.tags || []), 
      trustBadges: JSON.stringify(data.trustBadges || []),
      price: data.price || null, 
      originalPrice: data.originalPrice || null, 
      discount: data.discount || null,
      redirectType: data.redirectType || 'landing', 
      autoRedirect: data.autoRedirect ? 1 : 0
    });
    
    const result = await DB.prepare(`
      INSERT INTO affiliate_links (
        id, slug, title, description, destination_url, product_image, category,
        is_active, click_count, created_at, updated_at, tags, trust_badges,
        price, original_price, discount, redirect_type, auto_redirect
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, 
      data.slug, 
      data.title, 
      data.description, 
      data.destinationUrl,
      data.productImage || null, 
      data.category, 
      data.isActive ? 1 : 0, 
      0,
      now, 
      now, 
      JSON.stringify(data.tags || []), 
      JSON.stringify(data.trustBadges || []),
      data.price || null, 
      data.originalPrice || null, 
      data.discount || null,
      data.redirectType || 'landing', 
      data.autoRedirect ? 1 : 0
    ).run();
    
    console.log('Database insert result:', result);
    
    const newLink = {
      id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      destinationUrl: data.destinationUrl,
      productImage: data.productImage || null,
      category: data.category,
      isActive: data.isActive,
      clickCount: 0,
      createdAt: now,
      updatedAt: now,
      tags: data.tags || [],
      trustBadges: data.trustBadges || [],
      price: data.price || null,
      originalPrice: data.originalPrice || null,
      discount: data.discount || null,
      redirectType: data.redirectType || 'landing',
      autoRedirect: data.autoRedirect !== undefined ? data.autoRedirect : true
    };
    
    console.log('Returning new link:', newLink);
    
    return new Response(JSON.stringify(newLink), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('POST Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create affiliate link', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// PUT - Update affiliate link
async function handlePut(DB: D1Database, request: Request, pathSegments: string[]): Promise<Response> {
  try {
    if (pathSegments.length < 3) {
      return new Response(JSON.stringify({ error: 'Missing affiliate link ID' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const id = pathSegments[2];
    const data = await request.json();
    const now = new Date().toISOString();
    
    console.log('Updating affiliate link:', id, 'with data:', data);
    
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
    console.error('PUT Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update affiliate link',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// PATCH - Increment click count
async function handlePatch(DB: D1Database, request: Request, pathSegments: string[]): Promise<Response> {
  try {
    if (pathSegments.length < 4 || pathSegments[3] !== 'increment-clicks') {
      return new Response(JSON.stringify({ error: 'Invalid PATCH endpoint' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const id = pathSegments[2];
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
    
    return new Response(JSON.stringify({ success: true, message: 'Click count incremented' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('PATCH Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to increment click count' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// DELETE - Delete affiliate link
async function handleDelete(DB: D1Database, pathSegments: string[]): Promise<Response> {
  try {
    if (pathSegments.length < 3) {
      return new Response(JSON.stringify({ error: 'Missing affiliate link ID' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const id = pathSegments[2];
    const result = await DB.prepare('DELETE FROM affiliate_links WHERE id = ?').bind(id).run();
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: 'Affiliate link not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ success: true, message: 'Affiliate link deleted' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('DELETE Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete affiliate link' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}