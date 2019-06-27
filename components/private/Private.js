import React from 'react';
import Link from 'next/link';

const Private = () => {
  return (
    <div className="container">
      <h1>This is a private page</h1>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <div className="box" style={{ maxWidth: 400, marginTop: 20 }}>
        <h2>I&apos;m in a box</h2>
      </div>
    </div>
  );
};

export default Private;
