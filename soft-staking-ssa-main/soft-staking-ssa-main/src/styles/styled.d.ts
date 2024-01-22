import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: any;
    breakpoints: {
      mobile: string;
      tablet: string;
      wide: string;
      extraWide: string;
    };
  }
}
