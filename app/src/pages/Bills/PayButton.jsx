import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import Modal from "./Modal";

export default ({ billId ,amount}) => {
  const [open, setOpen] = useState(false);

  return <>
    <Button variant="outlined" size="small" color="primary" onClick={() => setOpen(true)}>
      Pay
    </Button>
    <Modal open={open} setOpen={setOpen} billId={billId} amount={amount}/>
  </>;
}
