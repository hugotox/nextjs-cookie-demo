import { render, cleanup } from 'react-testing-library';
import Modal from './Modal';
import ModalHeader from './ModalHeader';

describe('Modal component tests', () => {
  afterEach(cleanup);

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
    // Set-up event listener mock
    const map = {};
    window.addEventListener = jest
      .fn()
      .mockImplementation((event, callback) => {
        map[event] = callback;
      });

    const onHideHandler = jest.fn();
    render(
      <Modal onHide={onHideHandler} visible={true}>
        <ModalHeader />
      </Modal>
    );

    // Trigger keydown event
    map.keydown({ key: 'Escape' });

    expect(onHideHandler).toHaveBeenCalled();
  });
});
