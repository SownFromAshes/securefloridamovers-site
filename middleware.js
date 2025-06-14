// middleware.js
// This file runs in Vercel's Edge Runtime, which is a Web API environment.
// It does not have access to 'next/server' modules directly unless it's a Next.js project.

export const config = {
  matcher: '/', // Apply this middleware to the root path
};

export function middleware(request) {
  const userAgentString = request.headers.get('user-agent') || '';
  const url = new URL(request.url); // Use standard URL API

  // A more refined mobile phone detection regex (aims to exclude tablets)
  // This is a common challenge with User-Agent strings.
  const isMobilePhone = (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgentString) &&
      !/iPad|Tablet|Mobile Safari\/[0-9\.]+$/i.test(userAgentString) && // Exclude iPads, generic tablets
      !/(Windows Phone|Microsoft Data|ARM; Trident)/i.test(userAgentString) // Exclude Windows Phone which is often listed as 'Mobile' but not a typical phone
  );

  if (isMobilePhone) {
    // If it's a mobile phone, rewrite the path to mobile-index.html
    url.pathname = '/mobile-index.html';
    return Response.rewrite(url); // Use standard Response.rewrite
  }

  // For all other devices (desktop, tablet), allow the request to proceed to the original path (index.html)
  return Response.next(); // Use standard Response.next()
}