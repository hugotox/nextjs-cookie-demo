import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import { SCREEN_SIZE } from '../../../styles/global-styles';

const modalHeaderType = <ModalHeader />.type;
const animationSpeed = 300;

class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['full', 'large', 'medium', 'small'])
  };

  static defaultProps = {
    size: 'medium'
  };

  state = {
    fadeIn: false,
    display: 'none'
  };

  componentDidMount() {
    document.addEventListener('keyup', this.keyboardListener);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.setState({ display: 'block' });
      setTimeout(() => {
        this.setState({ fadeIn: true });
        document.body.style.overflow = 'hidden';
      }, 10);
    }
    if (this.props.visible && !nextProps.visible) {
      this.setState({ fadeIn: false });
      setTimeout(() => {
        this.setState({ display: 'none' });
        document.body.style.overflow = '';
      }, animationSpeed);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyboardListener);
    }
  }

  keyboardListener = e => {
    if (e.code === 'Escape') {
      const { onHide, visible } = this.props;
      if (visible) {
        onHide();
      }
    }
  };

  render() {
    const { children, onHide, size } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      if (child.type === modalHeaderType) {
        return React.cloneElement(child, { onHide });
      } else {
        return child;
      }
    });
    let width;
    switch (size) {
      case 'full':
        width = '100%';
        break;

      case 'large':
        width = '80%';
        break;

      case 'medium':
        width = '600px';
        break;

      case 'small':
        width = '400px';
        break;
    }
    return (
      <div className="wrapper" style={{ display: this.state.display }}>
        <div className="modal-overlay" onClick={onHide} />
        <div className={'box xmodal ' + (this.state.fadeIn ? 'fadeIn' : '')}>
          {childrenWithProps}
        </div>
        <style jsx>{/*language=CSS*/
        `
          .wrapper {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }

          .modal-overlay {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #999999;
            opacity: 0.3;
          }

          .xmodal {
            position: ${size === 'full' ? 'fixed' : 'relative'};
            width: ${width};
            min-height: 100px;
            margin: 0 auto;
            top: -10%;
            bottom: ${size === 'full' ? '0' : 'auto'};
            opacity: 0;
            transition: opacity ${animationSpeed}ms ease-in-out,
              top ${animationSpeed}ms ease-in-out;
          }

          .xmodal.fadeIn {
            opacity: 1;
            top: ${size === 'full' ? '0' : '10%'};
            bottom: ${size === 'full' ? '0' : 'auto'};
          }

          @media screen and (max-width: ${SCREEN_SIZE.small}) {
            .xmodal {
              width: 90%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Modal;
