import React, { useState } from 'react';

// import axios from "axios";

import { DialogActions, DialogContent, DialogTitle } from "../../components";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import PayPal from "./Paypal";

export default ({ open, setOpen,billId,amount}) => {
  
  const [value, setValue] = useState('');
  const [disable, setDisable] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open} disableBackdropClick={true} fullWidth>
        <DialogTitle>
          Payment
        </DialogTitle>
        <DialogContent dividers>
          <FormControl component="fieldset" style={{width : "100%"}}>
            <FormLabel component="legend">Method</FormLabel>
            <RadioGroup  name="method" value={value} onChange={handleChange}>
              <FormControlLabel value="stripe" control={<Radio />} label="Stripe" />
              {value === "stripe" && <PayPal setDisable={setDisable} billId={billId} amount={amount} />}
              {/* <FormControlLabel value="paypal" control={<Radio />} label="Pay Pal" />
              {value === "paypal" && <h3>Pay with Paypal</h3>} */}
            </RadioGroup>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary" disabled={disable}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>)
};