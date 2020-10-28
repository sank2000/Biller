import React,{useState,useEffect} from 'react';

import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '../../components';

export default ({setDisable,amount,billId}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [closePaypal, setClosePaypal] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
  };

  const handelSuccess =  async (details, data) => {
  
    setClosePaypal(true);

    setDisable(true);

    try{
      const res = await axios.post("/api/payment/paypal", {
        id: data.orderID,
        intent: details.intent,
        email: details.payer.email_address,
        status: details.status,
        time: details.update_time,
        billId
      });
      
      if (res.data.done) {
        setAlert({
          type: "success",
          message: res.data.message
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else {
        setAlert({
          type: "error",
          message: res.data.message
        });
        setDisable(false);
      }
      setOpen(true);
    }
    catch (error) {
        console.log(error);
    }
  }

  const handelError = (err) => {
    setAlert({
        type: "error",
        message: "Unable to make payments"
    });
  }


  useEffect(() => {
    addPayPalScript();
  }, []);


  return (
    <>
      {(sdkReady && !closePaypal) &&
        <PayPalButton
          amount={parseInt(amount * 0.014)}
          // shippingPreference="NO_SHIPPING" 
          onSuccess={handelSuccess}
          onError={handelError}
          onCancel={() => setDisable(false)}
        
        />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.type}>
            {alert.message}
          </Alert>
      </Snackbar>
    </>
  );
};

