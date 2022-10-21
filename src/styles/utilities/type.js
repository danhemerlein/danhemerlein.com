import { createGlobalStyle } from 'styled-components';
import happyTimeswoff from '../fonts/happy-times-regular.woff';
import happyTimeswoff2 from '../fonts/happy-times-regular.woff2';
import lackItalicWoff from '../fonts/lack-italic.woff';
import lackItalicWoff2 from '../fonts/lack-italic.woff2';
import lackRegularWoff from '../fonts/lack-regular.woff';
import lackRegularWoff2 from '../fonts/lack-regular.woff2';
import phantomGhostWoff from '../fonts/phantom-ghost.woff';

export default createGlobalStyle`
    @font-face {
      font-family: 'custom_serif';
      src: local('custom_serif'), local('happyTimes'),
      url(${happyTimeswoff2}) format('woff2'),
      url(${happyTimeswoff}) format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "lack_italic";
      src: local('lack_italic'), local('lackItalic'),
        url(${lackItalicWoff2}) format('woff2'),
        url(${lackItalicWoff}) format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "lack_regular";
      src: local('lack_regular'), local('lackRegular'),
        url(${lackRegularWoff2}) format('woff2'),
        url(${lackRegularWoff}) format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "phantom_ghost";
      src: local('phantom_ghost'), local('phantomGhost'),
        url(${phantomGhostWoff}) format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
`;
