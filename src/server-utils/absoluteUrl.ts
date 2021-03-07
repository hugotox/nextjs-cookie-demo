import { IncomingMessage } from 'http'

import { NEXT_PUBLIC_APP_PROTOCOL } from 'settings'

export function absoluteUrl(req?: IncomingMessage, localhostAddress = 'localhost:3001') {
  let host = (req?.headers ? req.headers.host : window.location.host) ?? localhostAddress
  const protocol = NEXT_PUBLIC_APP_PROTOCOL

  if (req?.headers['x-forwarded-host'] && typeof req.headers['x-forwarded-host'] === 'string') {
    host = req.headers['x-forwarded-host']
  }

  return {
    host,
    origin: `${protocol}//${host}`,
    protocol,
  }
}
