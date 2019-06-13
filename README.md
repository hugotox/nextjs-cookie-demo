# Next.js starter

Starter project using [Next.js](https://github.com/zeit/next.js/) with redux,
cookie based authentication, server side rendering and tests set up.

The user authentication is made in /pages/_app.js the first time the user access the page. It will use the session
cookie from the `req` object provided by Express to call `/api/whoami` endpoint. This endpoint returns a user object
or null if not authenticated.

The default behavior is to authenticate the user for all pages except public pages.

To create a public page it needs to include `isPublic: true` in the props returned by `getInitialProps`

E.g.

```javascript
class PublicPage extends Component {
  static async getInitialProps() {
    return {
      isPublic: true
    };
  }
  
  // rest of component...
}
```

With function components:

```javascript
function PublicPage() {
  return <div>...</div>
}

PublicPage.getInitialProps = async function() {
  return {
    isPublic: true
  };
}
```

### Run in dev mode

```
$ npm run dev
```

### Build & run production

```
$ npm run build
```

```
$ npm run start
```

## Run unit tests

```
$ npm run test
```

With coverage report

```
$ npm run test:coverage
```

Coverage report is exported to coverage/lcov-report/index.html