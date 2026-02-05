// POST-only affiliate API to bypass HTTP method issues
interface Env {
  DB: D1Database;
}

export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;
  const { DB } = env as Env;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
  };
  
  console.log('=== POST-ONLY AFFILIATE API ===');
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
    
    // Handle GET requests (list all)
    if (request.method === 'GET') {
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
    }
    
    // Handle POST requests with action parameter
    if (request.method === 'POST') {
      // Simple authentication
      const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
      const projectId = request.headers.get('X-Project-ID');
      
      if (apiKey !== 'droz-health-facts-api-key-2026' || projectId !== 'droz-health-facts') {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      const body = await request.json();
      const action = body.action;
      const id = body.id;
      
      console.log('POST action:', action, 'ID:', id);
      
      switch (action) {
        case 'delete':
          console.log('✅ DELETE action via POST');
          if (!id) {
            return new Response(JSON.stringify({ error: 'Missing ID' }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
          
          const deleteResult = await DB.prepare('DELETE FROM affiliate_links WHERE id = ?').bind(id).run();
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
          
        case 'update':
          console.log('✅ UPDATE action via POST');
          if (!id) {
            return new Response(JSON.stringify({ error: 'Missing ID' }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
          
          const updateData = body.data || {};
          console.log('Updating ID:', id, 'with data:', updateData);
          
          const now = new Date().toISOString();
          
          // Build dynamic update query with all fields
          const updateFields = [];
          const values = [];
          
          if (updateData.slug !== undefined) { updateFields.push('slug = ?'); values.push(updateData.slug); }
          if (updateData.title !== undefined) { updateFields.push('title = ?'); values.push(updateData.title); }
          if (updateData.description !== undefined) { updateFields.push('description = ?'); values.push(updateData.description); }
          if (updateData.destinationUrl !== undefined) { updateFields.push('destination_url = ?'); values.push(updateData.destinationUrl); }
          if (updateData.productImage !== undefined) { updateFields.push('product_image = ?'); values.push(updateData.productImage); }
          if (updateData.category !== undefined) { updateFields.push('category = ?'); values.push(updateData.category); }
          if (updateData.isActive !== undefined) { updateFields.push('is_active = ?'); values.push(updateData.isActive ? 1 : 0); }
          if (updateData.tags !== undefined) { updateFields.push('tags = ?'); values.push(JSON.stringify(updateData.tags)); }
          if (updateData.trustBadges !== undefined) { updateFields.push('trust_badges = ?'); values.push(JSON.stringify(updateData.trustBadges)); }
          if (updateData.price !== undefined) { updateFields.push('price = ?'); values.push(updateData.price); }
          if (updateData.originalPrice !== undefined) { updateFields.push('original_price = ?'); values.push(updateData.originalPrice); }
          if (updateData.discount !== undefined) { updateFields.push('discount = ?'); values.push(updateData.discount); }
          if (updateData.redirectType !== undefined) { updateFields.push('redirect_type = ?'); values.push(updateData.redirectType); }
          if (updateData.autoRedirect !== undefined) { updateFields.push('auto_redirect = ?'); values.push(updateData.autoRedirect ? 1 : 0); }
          
          updateFields.push('updated_at = ?');
          values.push(now);
          values.push(id);
          
          console.log('Update fields:', updateFields);
          console.log('Update values:', values);
          
          const updateResult = await DB.prepare(`
            UPDATE affiliate_links SET ${updateFields.join(', ')} WHERE id = ?
          `).bind(...values).run();
          
          console.log('Update result:', updateResult);
          
          if (updateResult.changes === 0) {
            return new Response(JSON.stringify({ error: 'Not found' }), {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
          
          return new Response(JSON.stringify({ success: true, message: 'Updated successfully', changes: updateResult.changes }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
          
        case 'create':
          console.log('✅ CREATE action via POST');
          const createData = body.data || body;
          console.log('Creating new link with data:', createData);
          
          // Validate required fields
          if (!createData.slug || !createData.title || !createData.description || !createData.destinationUrl || !createData.category) {
            return new Response(JSON.stringify({ 
              error: 'Missing required fields: slug, title, description, destinationUrl, category' 
            }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
          
          const newId = crypto.randomUUID();
          const createNow = new Date().toISOString();
          
          console.log('Inserting new link with ID:', newId);
          
          const createResult = await DB.prepare(`
            INSERT INTO affiliate_links (
              id, slug, title, description, destination_url, product_image, category,
              is_active, click_count, created_at, updated_at, tags, trust_badges,
              price, original_price, discount, redirect_type, auto_redirect
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            newId, 
            createData.slug, 
            createData.title, 
            createData.description, 
            createData.destinationUrl,
            createData.productImage || null, 
            createData.category, 
            createData.isActive ? 1 : 0, 
            0,
            createNow, 
            createNow, 
            JSON.stringify(createData.tags || []), 
            JSON.stringify(createData.trustBadges || []),
            createData.price || null, 
            createData.originalPrice || null, 
            createData.discount || null,
            createData.redirectType || 'landing', 
            createData.autoRedirect ? 1 : 0
          ).run();
          
          console.log('Create result:', createResult);
          
          const newLink = {
            id: newId,
            slug: createData.slug,
            title: createData.title,
            description: createData.description,
            destinationUrl: createData.destinationUrl,
            productImage: createData.productImage || null,
            category: createData.category,
            isActive: createData.isActive,
            clickCount: 0,
            createdAt: createNow,
            updatedAt: createNow,
            tags: createData.tags || [],
            trustBadges: createData.trustBadges || [],
            price: createData.price || null,
            originalPrice: createData.originalPrice || null,
            discount: createData.discount || null,
            redirectType: createData.redirectType || 'landing',
            autoRedirect: createData.autoRedirect !== undefined ? createData.autoRedirect : true
          };
          
          return new Response(JSON.stringify(newLink), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
          
        default:
          return new Response(JSON.stringify({ error: 'Invalid action', action }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
      }
    }
    
    return new Response(JSON.stringify({ error: 'Method not allowed', method: request.method }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
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