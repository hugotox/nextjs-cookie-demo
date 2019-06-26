import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout } from '../login/actions';
import Modal from '../ui/modal/Modal';
import ModalHeader from '../ui/modal/ModalHeader';

const Home = ({ dispatch, user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
  };

  if (!user) {
    return <div>No user found</div>;
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
      <button onClick={() => setShowModal(true)}>Show modal</button>
      <Modal onHide={() => setShowModal(false)} visible={showModal}>
        <ModalHeader>With header</ModalHeader>
        Hello!
      </Modal>
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default connect(state => state.auth)(Home);
