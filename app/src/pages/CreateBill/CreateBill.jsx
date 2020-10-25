import React,{useState,useEffect} from 'react';
import { Typography,Button } from '@material-ui/core';
import classes from "./style.module.scss";
import { AppBar, Modal } from '../../components';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TextField,MenuItem} from '@material-ui/core';

import axios from "axios";

import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Row(val,ind) {
  return <TableRow key={ind}>
    <TableCell component="th" scope="row">
      {ind+1}
    </TableCell>
    <TableCell>{val.name}</TableCell>
    <TableCell>{val.count}</TableCell>
    <TableCell>{val.price}</TableCell>
    <TableCell>{val.total}</TableCell>
  </TableRow>
}

function Total({data}) {
  return <>
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell >Subtotal</TableCell>
      <TableCell >{data.subTotal}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell >Tax</TableCell>
      <TableCell >{data.tax}%</TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell >Total</TableCell>
      <TableCell >{data.total}</TableCell>
    </TableRow>
  </>
}

function Bill({data,totals}) {
  return <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {data.map(Row)}
          </>
          <Total data={totals}/>
        </TableBody>
      </Table>
    </TableContainer>
  </>
}

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
        })
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
      const res = await axios.get("/api/user/");
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
          <Button variant="outlined" color="primary" onClick={handleSubmit} disabled={user === "" || items.length === 0 }>
            Create {load && <CircularProgress size={"1rem"} style={{marginLeft:"1rem"}}/>}
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


