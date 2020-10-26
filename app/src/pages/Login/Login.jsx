import React,{useState,useContext} from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import classes from "./style.module.scss";

import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Auth } from "../../contexts";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default () => {

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState({ 
    type: "",
    message: ""
  });
  const { setSession } = useContext(Auth);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(old => {
      return {
        ...old,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signin", data);
      if (res.data.auth) {
        setAlert({
          type: "success",
          message: res.data.message
        })
        setSession(res.data);
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


  return <section className={classes.container}>
    <div className={classes.leftSide} style={{backgroundImage : "url(/images/login-bg.jpg)"}}>
      &nbsp;
    </div>
    <div className={classes.rightSide}>
      <div className={classes.brand}>
        <img src={"/images/bill.png"} style={{ width: "3rem",height: "3rem",marginRight: "1rem" }} alt="logo" />
        <Typography variant="h4">
          Biller
        </Typography>
      </div>
      <form onSubmit={handleSubmit} style={{width : "90%"}}>
        <TextField label="Email" type="email" variant="outlined" name="email" onChange={handleChange} style={{width : "100%",marginBottom : "2rem"}} required/>
        <TextField type="password" label="Password" name="password" onChange={handleChange} variant="outlined" style={{ width: "100%",marginBottom: "2rem" }} required/>
        <Button variant="contained" color="primary" type="submit">
            Login  {load && <CircularProgress size={"1rem"} style={{marginLeft:"1rem",color: "white"}}/>}
        </Button>
      </form>
    </div>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
  </section>;
}
