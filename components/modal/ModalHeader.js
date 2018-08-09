import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalHeader extends Component {
  static propTypes = {
    onHide: PropTypes.func
  };

  render() {
    const { children, onHide } = this.props;
    return (
      <div className="modal-header">
        <div className="close" onClick={onHide}>
          <i className="fa fa-times" />
        </div>
        {children}
        <style jsx>{/*language=CSS*/ `
          .modal-header {
          }

          .close {
            position: absolute;
            right: 8px;
            top: 4px;
            cursor: pointer;
            color: #a5a3a3;
          }

          .close:hover {
            color: #8d8b8b;
          }
        `}</style>
      </div>
    );
  }
}

export default ModalHeader;
