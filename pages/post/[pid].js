import React from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";

const PostDetail = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className="container">
      <h3>Post id: {pid}</h3>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default PostDetail;
