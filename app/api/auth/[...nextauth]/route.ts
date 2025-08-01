import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const handler = NextAuth(authOptions);

// Wrap the handler to add CORS headers
async function wrappedHandler(req: NextRequest) {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // Call the NextAuth handler
  const response = await handler(req);

  // Add CORS headers to the response
  if (response instanceof NextResponse) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

export { wrappedHandler as GET, wrappedHandler as POST };

// Export config for edge runtime compatibility
export const runtime = 'nodejs';
