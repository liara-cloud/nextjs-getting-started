// middleware/logger.js
const logger = require('../utils/logger');

export function middleware(req) {
  const { method, url } = req.nextUrl;
  const userAgent = req.headers.get('user-agent') || 'Unknown user-agent';
  const authHeader = req.headers.get('authorization') || 'No authorization';

  // Log HTTP request method, URL, user-agent, and authorization token
  logger.info(`HTTP Request: ${method} ${url} | User-Agent: ${userAgent} | Authorization: ${authHeader}`);

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
