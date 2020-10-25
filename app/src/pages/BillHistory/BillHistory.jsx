import React,{useEffect,useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Loader,BillModal } from '../../components';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import IconButton from '@material-ui/core/IconButton';

import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default () => {

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [index,setIndex] = useState(0);

  const getBill = async () => {
    try {
      const res = await axios.get("/api/bill/show");
      setData(res.data);
      setLoad(false);
    }
    catch(err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getBill();
  },[]) 

  function Row(data, ind) {
    if (data.paid === true) {
      return <StyledTableRow StyledTableRow>
        <StyledTableCell>{ind + 1}</StyledTableCell>
        <StyledTableCell>{data._id}</StyledTableCell>
        <StyledTableCell>{data.customerId}</StyledTableCell>
        <StyledTableCell>{data.items.length}</StyledTableCell>
        <StyledTableCell>{data.total}</StyledTableCell>
        <StyledTableCell>
          <IconButton onClick={() => { setIndex(ind); setOpen(true); }}>
            <VisibilityRoundedIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>;
    } else {
      return <></>;
    }
      
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
                <StyledTableCell>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(Row)}
            </TableBody>
          </Table>
          </TableContainer>
          <BillModal open={open} setOpen={setOpen}  data={data[index]} />
      </>
    }
  </>;
}