import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

class ModalHeader extends Component {
  static propTypes = {
    onHide: PropTypes.func
  };

  render() {
    const { children, onHide } = this.props;
    return (
      <div className="modal-header">
        <div className="xclose" onClick={onHide}>
          <i className="fa fa-times" />
        </div>
        {children}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ModalHeader;
