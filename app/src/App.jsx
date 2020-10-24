import React from 'react';
import Router from "./Router";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import "./app.css";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FF7315" },
    secondary: { main: "#C73E1D" },
  }
});

export default () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
};
