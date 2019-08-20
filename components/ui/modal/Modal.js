import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import { SCREEN_SIZE } from 'styles/global-styles';

const modalHeaderType = <ModalHeader />.type;
const animationSpeed = 300;

const Modal = ({ children, onHide, size, visible }) => {
  const overlayRef = useRef(null);
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
    overlayRef.current.addEventListener('click', onHide);

    if (visible) {
      setDisplay('block');
      setTimeout(() => {
        setFadeIn(true);
        document.body.style.overflow = 'hidden';
      }, 50);
    } else {
      setFadeIn(false);
      setTimeout(() => {
        setDisplay('none');
        document.body.style.overflow = '';
      }, animationSpeed);
    }

    return () => {
      window.removeEventListener('keydown', keyboardListener);
      overlayRef.current.removeEventListener('click', onHide);
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
      <div className="modal-overlay" ref={overlayRef} />
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
          transition: opacity ${animationSpeed}ms ease-in-out, top ${animationSpeed}ms ease-in-out;
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
