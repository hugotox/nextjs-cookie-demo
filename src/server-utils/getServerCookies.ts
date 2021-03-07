import { IncomingMessage } from 'http'

export const getServerCookies = (req: IncomingMessage) => {
  const cookies: { [key: string]: string } = {}
  if (req.headers?.cookie) {
    const cookiesItems = req.headers.cookie.split('; ')
    cookiesItems.forEach((cookie: string) => {
      const parsedItem = cookie.split('=')
      if (parsedItem.length === 2) {
        cookies[parsedItem[0]] = decodeURI(parsedItem[1])
      }
    })
  }
  return cookies
}
