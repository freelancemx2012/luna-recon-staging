export const handler = async (event) => {
  const base = process.env.API_BASE_URL
  const apiKey = process.env.API_KEY || ''
  if (!base) return { statusCode: 500, body: 'API_BASE_URL not set' }

  const path = event.path.replace('/.netlify/functions/api-proxy', '')
  const url = base + path + (event.rawQuery ? `?${event.rawQuery}` : '')
  const method = event.httpMethod
  const headers = { ...event.headers }
  delete headers.host
  delete headers.connection
  headers['x-api-key'] = apiKey

  const resp = await fetch(url, {
    method,
    headers,
    body: ['GET','HEAD'].includes(method) ? undefined : event.body,
  })

  const buf = Buffer.from(await resp.arrayBuffer())
  return {
    statusCode: resp.status,
    headers: { 'content-type': resp.headers.get('content-type') || 'application/json' },
    body: buf.toString('base64'),
    isBase64Encoded: True,
  }
}