import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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


export default Row;