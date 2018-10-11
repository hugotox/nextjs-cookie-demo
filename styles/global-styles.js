import css from 'styled-jsx/css';

/*language=CSS*/
export default css.global`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .box {
    padding: 15px 30px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 2px 6px 1px hsla(0, 0%, 0%, 0.2);
  }
`;
