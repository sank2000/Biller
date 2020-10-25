import React,{useState} from 'react';
import { Typography,TextField,MenuItem,Button } from '@material-ui/core';
import classes from "./style.module.scss";
import { AppBar } from '../../components';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
      const res = await axios.post("/api/auth/signup", data);
      if (res.data.done) {
        setAlert({
          type: "success",
          message: res.data.message
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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

  const commonStyle = {
    width: "100%",
    marginBottom : "1rem"
  }

  const type = [
    {
      value: "admin",
      label: "Admin"
    },
    {
      value: "owner",
      label: "Owner"
    },
    {
      value: "customer",
      label: "Customer"
    }
  ]

  return <>
    <AppBar />
    <div className={classes.container}>
      <Typography variant="h5" style={commonStyle} >
          Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" onChange={handleChange} name="name" variant="outlined" style={commonStyle} required />
        <TextField label="Password" onChange={handleChange} name="password"  type="password" variant="outlined" style={commonStyle} required />
        <TextField label="Email" onChange={handleChange} name="email" type="email"  variant="outlined" style={commonStyle} required />
        <TextField label="Phone" onChange={handleChange} name="phone"  variant="outlined" style={commonStyle} required />
        <TextField label="Type" onChange={handleChange} name="type"  variant="outlined" select style={commonStyle} required >
          {
            type.map((option) => {
             return <MenuItem key={option.value} value={option.value}>
              {option.label}
             </MenuItem>
            })
          }
        </TextField>
        <TextField label="Company Name" onChange={handleChange} name="companyName"  variant="outlined" style={commonStyle} />
        <TextField label="Address" onChange={handleChange} name="address"  multiline rows={4} variant="outlined" style={commonStyle} />
        <Button variant="outlined" color="primary" type="submit">
          Create {load && <CircularProgress size={"1rem"} style={{marginLeft:"1rem"}}/>}
        </Button>
      </form>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  </>;
}


