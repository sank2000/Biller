import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '../../components';

import axios from "axios";

export default ({ id }) => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoad(true);
    try {
      const res = await axios.post("/api/bill/pay", {id});
      if (res.data.done) {
        setAlert({
          type: "success",
          message: res.data.message
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        setAlert({
          type: "error",
          message: res.data.message
        })
      }
      setOpen(true);
      setLoad(false);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  return <>
    <Button variant="outlined" size="small" color="primary" onClick={handleSubmit}>
      Pay Now {load && <CircularProgress size={".7rem"} style={{marginLeft:"1rem"}}/>}
    </Button>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
  </>;
}
