import React,{useState,useEffect} from 'react';
import { Typography,Button } from '@material-ui/core';
import classes from "./style.module.scss";
import { AppBar, Modal,Alert } from '../../components';

import {TextField,MenuItem} from '@material-ui/core';

import axios from "axios";

import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';

import Bill from "./Bill";

export default () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [totals, setTotals] = useState({});
  const [user,setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [Aopen, AsetOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    AsetOpen(false);
  };

  const handleSubmit = async () => {
    
    setLoad(true);

    const data = {
      items: JSON.stringify(items),
      customerId : user,
      ...totals,
      company: JSON.stringify({})
    };

    try {
      const res = await axios.post("/api/bill/create", data);
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
      AsetOpen(true);
      setLoad(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  const getData = async () => {
    try {
      const res = await axios.get("/api/user/customer");
      setUsers(res.data.map(data => {
        return {
          value: data._id,
          label: data.name
        }
      }));
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData();
  },[])

  useEffect(() => {
    let total = 0;
    for (let data of items){
      total = total + data.total
    }
    setTotals({
      subTotal: total,
      tax: 7,
      total: total - (total * (7/100))
    })
  },[items])

  return <>
    <AppBar />
    <div className={classes.container}>
      <Typography variant="h5" style={{textAlign: "center"}} >
        Bill
      </Typography>
      
      <div className={classes.bill_container}>
        <div className={classes.bill_top}>
            <TextField label="To" variant="outlined" select  style={{minWidth : "4rem"}} onChange={(e) => setUser(e.target.value)}>
            {
              users.map((option) => {
              return <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
              })
            }
          </TextField>
           <Typography variant="subtitle1" >
              Date : {new Date().toLocaleDateString()}
           </Typography>
        </div>
        <div className={classes.bill_middle}>
          {
            items.length === 0 ?  <Typography variant="h6" style={{textAlign: "center",margin: "5rem 0"}} >
              Add Items to Bill
              </Typography> : <Bill data={items} totals={totals} />
          }
        </div>
        <div className={classes.bill_bottom}>
          <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>
            Add Item
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={user === "" || items.length === 0 }>
            Create {load && <CircularProgress size={"1rem"} style={{marginLeft:"1rem",color: "white"}}/>}
          </Button>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} setItems={setItems} /> 

      <Snackbar open={Aopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>

    </div>
  </>;
}


