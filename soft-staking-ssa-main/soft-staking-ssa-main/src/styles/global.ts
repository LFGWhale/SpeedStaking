import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    // background: ${({ theme }) => theme.colors.background};
    /* background-color: #F00; */
    // background: #323778;
    /* Created with https://www.css-gradient.com */
    /* background: rgba(51, 100, 171, 1.0);
     background: -webkit-radial-gradient(left, rgba(51, 100, 171, 1.0), rgba(49, 59, 120, 1.0));
     background: -moz-radial-gradient(left, rgba(51, 100, 171, 1.0), rgba(49, 59, 120, 1.0));
     background: radial-gradient(to right, rgba(51, 100, 171, 1.0), rgba(49, 59, 120, 1.0));
    
    background-image: url('/');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover; */
  }

  html {
    font-size: 62.5%; // 1rem = 10px
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    position: relative;
    /*background-image: url('https://i.imgur.com/2XTKR66.png'); */
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    background-position: bottom 10px right;
    
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 3px;
    background-color:#787878;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.7);
    -webkit-border-radius: 8px;
  }

  .ReactModal__Overlay {
    -webkit-perspective: 600;
    perspective: 600;
    opacity: 0;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
    transition: opacity .2s ease;
  }

  .ReactModal__Content {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  .ReactModal__Content--after-open {
    -webkit-transform: scale(1);
    transform: scale(1);
    transition: all .2s ease;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .ReactModal__Content--before-close {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    transition: all .2s ease-in;
  }

  .ReactModal__Body--open,
  .ReactModal__Html--open {
    overflow: hidden;
  }

  .modal-overlay {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(4px);
  }

  .modal-content {
    z-index: 999;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 20px;
    border: none;
    outline: none;
    max-width: 600px;
    max-height: 450px;
    height: 100%;
    margin: auto;
    overflow: hidden;

    @media ${({ theme }) => theme.breakpoints.mobile} {
      width: 90%;
    }
  }

  .imageBG {
    /* background-color: #F00; */
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
  }

  body {
    
    position: relative;
    overflow-x: hidden;
}

.bg {
  z-index: -1;
  background: #323778;
    display: block;
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.squirrel {
  z-index: ;
    height: 1080px;
    width: 982px;
    background: url('https://cdn.discordapp.com/attachments/823730747806187520/984215078989627392/BG.png') no-repeat;
    background-size: 970px;
    position: absolute;
    right: -270px;
    top: 120px;
    opacity: 35%;
}

.light-gdr, .dark-gdr {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: block;
    position: absolute;
}

.light-gdr {
    background: radial-gradient(ellipse farthest-side at 5% 5% , rgba(58,111,183,1) 0%, rgba(58,111,183,0) 100%);
}

.dark-gdr {
    background: radial-gradient(ellipse farthest-side at 100% 100% , rgba(37,41,90,1) 0%, rgba(37,41,90,0) 100%);
}
`;
