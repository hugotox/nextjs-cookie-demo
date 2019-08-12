import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Modal from 'components/ui/modal/Modal';
import ModalHeader from 'components/ui/modal/ModalHeader';

const Home = ({ logout, user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  if (!user) {
    return (
      <div>
        No user found
        <br />
        <Link href="/private">
          <a>Private</a>
        </Link>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Hi {user.username}</h1>
      <h2>A dead simple, responsive boilerplate.</h2>
      <a href="/api/logout" onClick={handleLogout}>
        Logout
      </a>
      <br />
      <Link href="/private">
        <a>Private</a>
      </Link>
      <br />
      <Link href="/post/12">
        <a>A post</a>
      </Link>
      <br />
      <button onClick={() => setShowModal(true)}>Show modal</button>
      <Modal onHide={() => setShowModal(false)} visible={showModal}>
        <ModalHeader>With header</ModalHeader>
        Hello!
      </Modal>
    </div>
  );
};

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Home;
