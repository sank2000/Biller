import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import classes from "./style.module.scss";

export default () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted")
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
      <form onSubmit={handleSubmit}>
        <TextField label="Email" variant="outlined" style={{width : "100%",marginBottom : "2rem"}} required/>
        <TextField type="password" label="Password" variant="outlined" style={{ width: "100%",marginBottom: "2rem" }} required/>
        <Button variant="outlined" color="primary" type="submit">
            Login
        </Button>
      </form>
    </div>
  </section>;
}
