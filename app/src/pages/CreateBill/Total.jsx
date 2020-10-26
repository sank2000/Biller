import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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


export default Total;