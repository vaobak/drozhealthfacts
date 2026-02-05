// Simplified affiliate function to test HTTP methods
export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
  };
  
  console.log('=== SIMPLE AFFILIATE API ===');
  console.log('Method:', request.method);
  console.log('URL:', request.url);
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    console.log('Handling CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }
  
  // Simple response for all methods
  const response = {
    method: request.method,
    url: request.url,
    timestamp: new Date().toISOString(),
    message: `Affiliate API ${request.method} method is working!`,
    status: 'success',
    hasDB: !!env.DB,
    pathSegments: request.url.split('/').filter(Boolean)
  };
  
  console.log('Returning response:', response);
  
  return new Response(JSON.stringify(response), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}