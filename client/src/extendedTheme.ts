import "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      layout: {
        padding: number;
        backgroundColor: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      layout?: {
        padding?: number;
        backgroundColor?: string;
      };
    };
  }
}
