import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout } from '../../lib/auth/actions';
import Modal from '../../components/modal/Modal';

class Home extends Component {
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
      <div>
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
        <button onClick={() => this.setState({ showModal: true })}>
          Show modal
        </button>
        <Modal
          onHide={() => this.setState({ showModal: false })}
          visible={this.state.showModal}
        >
          Hola
        </Modal>
      </div>
    );
  }
}

export default connect(state => state.auth)(Home);
