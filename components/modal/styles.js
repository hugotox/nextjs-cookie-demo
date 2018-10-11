import css from 'styled-jsx/css';

const animationSpeed = 300;

// language=CSS
export default css`
  .wrapper {
    position: relative;
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
    position: fixed;
    width: 400px;
    min-height: 100px;
    left: calc(50% - 200px);
    top: -10%;
    opacity: 0;
    transition: opacity ${animationSpeed}ms ease-in-out,
      top ${animationSpeed}ms ease-in-out;
  }

  .xmodal.fadeIn {
    opacity: 1;
    top: 10%;
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

  .modal-header {
    margin: -25px -30px 10px;
    padding: 12px 30px 10px 30px;
    background-color: #ecf0f1;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: #34495e;
    border-bottom: none;
  }
`;
