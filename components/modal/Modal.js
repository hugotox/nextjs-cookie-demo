import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';

const modalHeaderType = <ModalHeader />.type;
const animationSpeed = 300;

class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onHide: PropTypes.func.isRequired
  };

  state = {
    fadeIn: false,
    display: 'none'
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', this.keyboardListener);
      }
      this.setState({ display: 'block' });
      setTimeout(() => {
        this.setState({ fadeIn: true });
        document.body.style.overflow = 'hidden';
      }, 1);
    }
    if (this.props.visible && !nextProps.visible) {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', this.keyboardListener);
      }
      this.setState({ fadeIn: false });
      setTimeout(() => {
        this.setState({ display: 'none' });
        document.body.style.overflow = '';
      }, animationSpeed);
    }
  }

  keyboardListener = e => {
    if (e.code === 'Escape') {
      this.props.onHide();
    }
  };

  render() {
    const { children, onHide } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      if (child.type === modalHeaderType) {
        return React.cloneElement(child, { onHide });
      } else {
        return child;
      }
    });
    return (
      <div className="wrapper" style={{ display: this.state.display }}>
        <div className="modal-overlay" onClick={onHide} />
        <div className={'box modal ' + (this.state.fadeIn ? 'fadeIn' : '')}>
          {childrenWithProps}
        </div>
        <style jsx>{/*language=CSS*/ `
          .wrapper {
            position: relative;
          }

          .modal-overlay {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #e2e2e2;
            opacity: 0.5;
          }

          .modal {
            position: fixed;
            width: 400px;
            height: 60%;
            left: calc(50% - 200px);
            top: -10%;
            opacity: 0;
            transition: opacity ${animationSpeed}ms ease-in-out,
              top ${animationSpeed}ms ease-in-out;
          }

          .modal.fadeIn {
            opacity: 1;
            top: 10%;
          }
        `}</style>
      </div>
    );
  }
}

export default Modal;
