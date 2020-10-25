import React,{useEffect,useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Loader } from '../../components';
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

  const getUser = async () => {
    try {
      const res = await axios.get("/api/user/all");
      setData(res.data);
      setLoad(false);
    }
    catch(err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getUser();
  },[]) 

  function Row(data, ind) {
    return <StyledTableRow StyledTableRow>
      <StyledTableCell>{ind + 1}</StyledTableCell>
      <StyledTableCell>{data.name}</StyledTableCell>
      <StyledTableCell>{data.type}</StyledTableCell>
      <StyledTableCell>{data.email}</StyledTableCell>
      <StyledTableCell>{data.phone}</StyledTableCell>
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
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(Row)}
            </TableBody>
          </Table>
          </TableContainer>
      </>
    }
  </>;
}
