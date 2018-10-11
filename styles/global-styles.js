import css from 'styled-jsx/css';

export const SCREEN_SIZE = {
  small: '767px',
  medium: '992px',
  large: '1200px'
};

export const COLORS = {
  orange: '#f63',
  blue: '#4a90e2',
  blueHover: '#386cab',
  textRegular: '#646464',
  textBlack: '#222222',
  textGray: '#9D9D9D',
  borderGray: '#CCC',
  grayBackground: '#f9f9f9',
  yellowBackground: '#FFCC66',
  blackBackground: '#151515'
};

/*language=CSS*/
export default css.global`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html,
  body {
    font-family: 'Raleway', sans-serif !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    color: ${COLORS.textRegular} !important;
    margin: 0;
    padding: 0;
  }

  * {
    transition: color 150ms, background-color 150ms, box-shadow 150ms;
  }
  
  .hover,
  .link {
    cursor: pointer;
  }

  .box {
    padding: 25px 30px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 2px 6px 1px hsla(0, 0%, 0%, 0.2);
  }

  .box-light {
    padding: 25px 30px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 2px 6px 1px hsla(0, 0%, 0%, 0.02);
  }

  form h1,
  form h2,
  form h3,
  form h4 {
    margin-top: 0;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none !important;
  }
`;
