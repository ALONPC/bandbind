import "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      layout: {
        padding: string;
        backgroundColor: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      layout?: {
        padding?: string;
        backgroundColor?: string;
      };
    };
  }
}
