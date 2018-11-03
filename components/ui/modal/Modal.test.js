import { render, fireEvent } from 'react-testing-library';
import Modal from './Modal';
import ModalHeader from './ModalHeader';

describe('Modal component tests', () => {
  it('should render', function() {
    const onHideHandler = jest.fn();
    const { rerender } = render(
      <Modal onHide={onHideHandler}>
        <ModalHeader />
      </Modal>
    );

    // re-render the same component with different props
    rerender(
      <Modal onHide={onHideHandler} visible={true}>
        <ModalHeader />
      </Modal>
    );

    rerender(
      <Modal onHide={onHideHandler} visible={false}>
        <ModalHeader />
      </Modal>
    );
  });

  it('should hide when pressing ESC key', function() {
    const onHideHandler = jest.fn();
    const { container } = render(
      <Modal onHide={onHideHandler}>
        <ModalHeader />
      </Modal>
    );

    fireEvent.keyDown(document.getElementsByTagName('body')[0], {
      key: 'Escape',
      keyCode: 27,
      which: 27
    });
  });
});
