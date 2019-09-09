import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import { SCREEN_SIZE } from 'styles/global-styles';

const modalHeader = <ModalHeader />;
const modalHeaderType = modalHeader.type;
const animationSpeed = 300;

const Modal = ({ children, onHide, size, visible }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [display, setDisplay] = useState('none');

  const keyboardListener = e => {
    const key = e.key || e.keyCode;
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      if (visible) {
        onHide();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardListener);

    if (visible) {
      document.body.style.overflow = 'hidden';
      setDisplay('block');
      setTimeout(() => {
        setFadeIn(true);
      }, 50);
    } else {
      document.body.style.overflow = '';
      setFadeIn(false);
      setTimeout(() => {
        setDisplay('none');
      }, animationSpeed);
    }

    return () => {
      window.removeEventListener('keydown', keyboardListener);
    };
  }, [visible]);

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
    <div className="wrapper" style={{ display }}>
      {/* eslint-disable-next-line */}
      <div className={'modal-overlay ' + (fadeIn ? 'fadeIn' : '')} onClick={onHide} />
      <div className={'box xmodal ' + (fadeIn ? 'fadeIn' : '')} data-testid="modal-body">
        {childrenWithProps}
      </div>
      <style jsx>{`
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
          background-color: #000;
          opacity: 0;
          transition: opacity ${animationSpeed}ms ease-in-out;
        }

        .xmodal {
          position: ${size === 'full' ? 'fixed' : 'relative'};
          width: ${width};
          min-height: 100px;
          margin: 0 auto;
          top: ${size === 'full' ? '0' : '50%'};
          bottom: ${size === 'full' ? '0' : 'auto'};
          opacity: 0;
          transition: opacity ${animationSpeed}ms ease-in-out;
          transform: translateY(-50%);
        }

        .fadeIn {
          opacity: 1;
        }

        .modal-overlay.fadeIn {
          opacity: 0.5;
        }

        @media screen and (max-width: ${SCREEN_SIZE.small}) {
          .xmodal {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['full', 'large', 'medium', 'small']),
  children: PropTypes.any,
};

Modal.defaultProps = {
  size: 'medium',
};

export default Modal;
