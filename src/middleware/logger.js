// middleware/logger.js
const logger = require('../utils/logger');

export function middleware(req) {
  const { method, url } = req.nextUrl;
  logger.info(`HTTP Request: ${method} ${url}`);
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',  // Apply to all /api routes
};
