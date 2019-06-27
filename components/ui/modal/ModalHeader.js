import React from 'react';
import PropTypes from 'prop-types';

const ModalHeader = ({ children, onHide }) => {
  const handleKeyDown = e => {
    const key = e.key || e.keyCode;
    if (key === 'Enter') {
      onHide();
    }
  };

  return (
    <div className="modal-header">
      <div className="xclose" onClick={onHide} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
        <i className="fa fa-times" />
      </div>
      {children}
      <style jsx>{`
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
};

ModalHeader.propTypes = {
  onHide: PropTypes.func,
  children: PropTypes.any
};

export default ModalHeader;
