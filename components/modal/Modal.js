import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import styles from './styles';

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
        <div className={'box xmodal ' + (this.state.fadeIn ? 'fadeIn' : '')}>
          {childrenWithProps}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Modal;
