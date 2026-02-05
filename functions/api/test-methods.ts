// Simple test function to verify HTTP methods work
export async function onRequest(context: any): Promise<Response> {
  const { request } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-ID',
  };
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  const response = {
    method: request.method,
    url: request.url,
    timestamp: new Date().toISOString(),
    message: `${request.method} method is working!`,
    status: 'success'
  };
  
  return new Response(JSON.stringify(response), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}