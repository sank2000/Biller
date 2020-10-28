import React,{useEffect,useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AppBar, Loader,StyledTableCell,StyledTableRow } from '../../components';
import axios from "axios";

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
    return <StyledTableRow StyledTableRow key={ind}> 
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
