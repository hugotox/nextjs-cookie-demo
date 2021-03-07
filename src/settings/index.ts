// private settings
export const JWT_EXPIRES = 31556926 // 1 year in seconds
export const JWT_KEY = process.env.JWT_KEY ?? ''

// public settings
export const NEXT_PUBLIC_APP_PROTOCOL = process.env.NEXT_PUBLIC_APP_PROTOCOL ?? 'http:'
export const NEXT_PUBLIC_NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV ?? 'development'
