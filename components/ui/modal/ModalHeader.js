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
        <div className="xclose" onClick={onHide}>
          <i className="fa fa-times" />
        </div>
        {children}
        <style jsx>{/*language=CSS*/
        `
          .modal-header {
            margin: -25px -30px 10px;
            padding: 12px 30px 10px 30px;
            background-color: #ecf0f1;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            color: #34495e;
            border-bottom: none;
          }

          .xclose {
            position: absolute;
            right: 15px;
            top: 12px;
            cursor: pointer;
            color: #a5a3a3;
            font-size: 16px;
          }

          .xclose:hover {
            color: #8d8b8b;
          }
        `}</style>
      </div>
    );
  }
}

export default ModalHeader;
