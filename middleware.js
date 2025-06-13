import { NextResponse } from 'next/server'; // userAgent helper is often imported from a framework like Next.js, 
                                        // but for plain JS, you might parse userAgent manually or use a simple regex

export const config = {
  matcher: '/', // Apply this middleware to the root path
};

export function middleware(request) {
  const userAgentString = request.headers.get('user-agent') || '';

  // Basic mobile phone detection (be aware this is simplified, userAgent can be complex)
  const isMobilePhone = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgentString) && !/iPad|Tablet/i.test(userAgentString);

  if (isMobilePhone) {
    const url = request.nextUrl.clone();
    url.pathname = '/mobile-index.html'; // Path to your mobile-specific page
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}