# Next.js starter

Starter project using [Next.js](https://github.com/zeit/next.js/) with redux,
cookie based authentication, server side rendering and tests set up.

By default, authentication is not enforced for any page. To make pages available to authenticated users only, use the `withLoginRequired` higher order component.

The `withLoginRequired` HOC will make an API call server side the first time the page is accessed. It will use the session
cookie from the `req` object provided by Express to call `/api/whoami` endpoint. This endpoint returns a user object if authenticated, and saves it to redux store.

### `withLoginRequired` example usage:

```javascript
import withLoginRequired from '../lib/auth/with-login-required';
import Home from '../components/index/Home';

export default withLoginRequired(Home);
```

If no session cookie is found, it will redirect to `/login`, otherwise it will inject the `user` object as a prop to the wrapped component.

### `withLoginRequired` and `connect` example

If you need to make your page component a redux container, just connect it to redux using the `compose` function:

```javascript
import { connect } from 'react-redux';
import { compose } from 'redux';
import Home from '../components/index/Home';
import withLoginRequired from '../lib/auth/with-login-required';

const mapStateToProps = state => {
  return {
    // return desired props from redux
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create your action dispatchers here
  };
};

export default compose(
  withLoginRequired,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
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
