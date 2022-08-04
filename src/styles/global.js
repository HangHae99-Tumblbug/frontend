import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *{
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    margin: 0px;
    padding: 0px;
   
    overflow-x: hidden;
    min-width: 320px;
    background: #f6f5f5;
    /* font-family: 'SpoqaHanSans', 'Helvetica Neue', Arial, Helvetica, sans-serif; */
    font-size: 1rem;
    line-height: 1.7em;
    background-color: rgb(255, 255, 255);
  
    
  }

  a, div {
    text-decoration: none;
   
    -webkit-tap-highlight-color: rgba(0,0,0,.1);
  }

  h3, p, div {
    word-break: break-all;
  }
`;

export default GlobalStyle;
