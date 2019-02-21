import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout } from '../login/actions';
import Modal from '../ui/modal/Modal';
import ModalHeader from '../ui/modal/ModalHeader';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  state = {
    showModal: false
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.dispatch(logout());
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return <div>No user found</div>;
    }
    return (
      <div className="container">
        <h1>Hi {user.username}</h1>
        <h2>A dead simple, responsive boilerplate.</h2>
        <a href="/api/logout" onClick={this.handleLogout}>
          Logout
        </a>
        <br />
        <Link href="/private">
          <a>Private</a>
        </Link>
        <br />
        <button onClick={() => this.setState({ showModal: true })}>Show modal</button>
        <Modal onHide={() => this.setState({ showModal: false })} visible={this.state.showModal}>
          <ModalHeader>With header</ModalHeader>
          Hola
        </Modal>
      </div>
    );
  }
}

export default connect(state => state.auth)(Home);
