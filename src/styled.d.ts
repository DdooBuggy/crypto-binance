import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
    boxColor: string;
    redColor: string;
    greenColor: string;
    blueColor: string;
  }
}
