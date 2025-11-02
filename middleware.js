import { NextResponse } from 'next/server';

function parseBasicAuth(header) {
  if (!header || !header.startsWith('Basic ')) return null;
  try {
    const decoded = Buffer.from(header.split(' ')[1] || '', 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx === -1) return { user: '', pass: decoded };
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch {
    return null;
  }
}

export function middleware(req) {
  const stagePass = process.env.STAGE_PASSWORD;
  if (!stagePass) return NextResponse.next();

  const creds = parseBasicAuth(req.headers.get('authorization'));
  if (creds && creds.pass === stagePass) {
    return NextResponse.next();
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Staging"' },
  });
}

export const config = { matcher: ['/(.*)'] };
