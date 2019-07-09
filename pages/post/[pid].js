import { useRouter } from 'next/router';

const PostDetail = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className="container">
      <h3>Post id: {pid}</h3>
    </div>
  );
};

export default PostDetail;
