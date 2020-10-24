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

export default () => {

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [totals, setTotals] = useState({});

  const handleSubmit = () => {
    console.log(items);
  }

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
            <TextField label="To" variant="outlined" select  style={{minWidth : "4rem"}}>
            {
              type.map((option) => {
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
          <Button variant="outlined" color="primary" onClick={handleSubmit} disabled={true}>
            Create
          </Button>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} setItems={setItems} /> 
    </div>
  </>;
}


