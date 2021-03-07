import { AppStore, wrapper } from 'modules/app'
import { whoAmI } from 'modules/auth/thunks'
import { absoluteUrl } from 'server-utils'
import { getServerCookies } from 'server-utils/getServerCookies'

export interface AuthUserOptions {
  role: string
}

export const withAuthedUser = (options?: AuthUserOptions) => (originalGSSP?: any) =>
  wrapper.getServerSideProps(async (ctx) => {
    const { req } = ctx
    const store: AppStore = ctx.store
    let user
    const { token } = getServerCookies(req)
    if (token) {
      user = await store?.dispatch(whoAmI({ baseUrl: absoluteUrl(req).origin, token }))
    }
    if (!user) {
      // @ts-expect-error `resolvedUrl` is missing in the wrapper typedef. Will be fixed in next release
      const resolvedUrl: string = ctx.resolvedUrl ?? ''
      return {
        redirect: {
          destination: `/login?next=${resolvedUrl}`,
          permanent: false,
        },
      }
    }
    if (typeof originalGSSP === 'function') {
      return originalGSSP({ ctx })
    }
    return {
      props: { user },
    }
  })
