import { DefaultTheme } from 'styled-components';

import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  CARD_COLOR,
  BUTTON_COLOR,
  BUTTON_TEXT_COLOR,
  PROGRESS_BAR_COLOR,
  PROGRESS_BAR_BG_COLOR,
  DIVIDER_COLOR,
} from '../../constants';

export const theme: DefaultTheme = {
  colors: {
    gray: {
      1: '#161618',
      2: '#1C1C1F',
      3: '#232326',
      4: '#28282C',
      5: '#2E2E32',
      6: '#34343A',
      7: '#3E3E44',
      8: '#C8C7CB',
      9: '#706F78',
      10: '#7E7D86',
      11: '#A09FA6',
      12: '#EDEDEF'
    },
    background: BACKGROUND_COLOR,
    text: TEXT_COLOR,
    card: CARD_COLOR,
    button: BUTTON_COLOR,
    buttonText: BUTTON_TEXT_COLOR,
    progressBar: PROGRESS_BAR_COLOR,
    progressBarBg: PROGRESS_BAR_BG_COLOR,
    divider: DIVIDER_COLOR,
  },
  breakpoints: {
    mobile: 'only screen and (max-width: 769px)',
    tablet: 'only screen and (max-width: 1023px)',
    wide: 'only screen and (min-width: 1536px)',
    extraWide: 'only screen and (min-width: 1921px)'
  }
};

/**
 * @example

  @media ${({ theme }) => theme.breakpoints.mobile} {}
  @media ${({ theme }) => theme.breakpoints.tablet} {}
  @media ${({ theme }) => theme.breakpoints.wide} {}
  @media ${({ theme }) => theme.breakpoints.extraWide} {}
 */
