import React,{useState,useEffect} from 'react';
import Router from "./Router";
import axios from "axios";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {Loader} from "./components"

import "./app.css";

import { Auth } from './contexts';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FF7315" },
    secondary: { main: "#C73E1D" },
  }
});



export default () => {

  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/auth/')
      .then(res => {
        setSession({ ...res.data });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Auth.Provider value={{session, setSession}}>
          {
            loading ? <Loader /> : <Router />
          }
        </Auth.Provider>
      </ThemeProvider>
    </>
  );
};
