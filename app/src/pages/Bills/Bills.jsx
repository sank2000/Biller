import React,{useEffect,useState,useContext} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AppBar, Loader,BillModal,StyledTableRow,StyledTableCell } from '../../components';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import IconButton from '@material-ui/core/IconButton';
import PayButton from "./PayButton";

import { Typography } from '@material-ui/core';

import { Auth } from "../../contexts";

import axios from "axios";

export default () => {

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { session } = useContext(Auth);

  const getBill = async () => {
    try {
      let url = "/api/bill/show";
      if (session.type === "customer") {
        url = "/api/bill/shownotpaid"
      } 
      const res = await axios.get(url);
      setData(res.data);
      setLoad(false);
    }
    catch(err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getBill();
    // eslint-disable-next-line 
  },[]) 

  function Row(data, ind) {
      return <StyledTableRow StyledTableRow>
        <StyledTableCell>{ind + 1}</StyledTableCell>
        <StyledTableCell>{data._id}</StyledTableCell>
        <StyledTableCell>{data.customerId}</StyledTableCell>
        <StyledTableCell>{data.items.length}</StyledTableCell>
        <StyledTableCell>{data.total}</StyledTableCell>
        {session.type === "customer" ? <StyledTableCell>
            <PayButton billId={data._id} amount={data.total} />
          </StyledTableCell> : <StyledTableCell>{data.paid ? "Paid" : "Not Paid"}</StyledTableCell>}
        <StyledTableCell>
          <IconButton onClick={() => { setIndex(ind); setOpen(true); }}>
            <VisibilityRoundedIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
  }

  return <>
    <AppBar />
    {
      load ? <Loader /> :
        <>
        <TableContainer component={Paper} style={{width: "90%",margin: "5rem auto"}}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Bill.no</StyledTableCell>
                <StyledTableCell>Customer.no</StyledTableCell>
                <StyledTableCell>Count</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(Row)}
            </TableBody>
          </Table>
          </TableContainer>
          {data.length === 0 && <Typography variant="h6" style={{textAlign : "center"}}>No Bill Found</Typography>}
          {data.length !== 0 && <BillModal open={open} setOpen={setOpen}  data={data[index]} />}
      </>
    }
  </>;
}
