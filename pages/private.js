import React, { Component } from 'react';
import Link from 'next/link';

class Private extends Component {
  render() {
    return (
      <div>
        <h1>This is a private page</h1>
        <Link href="/">
          <a>Home</a>
        </Link>
        <div className="box">
          <h2>yo</h2>
        </div>
      </div>
    );
  }
}

export default Private;
