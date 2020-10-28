import React,{useState,useContext} from 'react';
import axios from "axios";

import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '../../components';

import {Auth } from "../../contexts";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51HgZQIDb5IfsHukvjCC40Ha3u9cIlUn1CTUjOldodyvcHObdplUEpWBNCpLELMwYedX0u9LwitGjZb9DeGoAagTq00tM6Ck9LC");

export default (props) => {
  return (
    <>
      <Elements stripe={stripePromise}>
          <Paypal {...props} />
      </Elements>
    </>
  );
};


const Paypal = ({setDisable,amount,billId}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const { session } = useContext(Auth);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async event => {

    setLoad(true);
    setDisable(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
            name : session.name,
            email : session.email,
        }
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post("/api/payment/stripe", { id, amount: amount * 100,billId});
        if (data.done) {
        setAlert({
          type: "success",
          message: data.message
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else {
          setAlert({
            type: "error",
            message: data.message
          });
          setDisable(false);
      }

        setLoad(false);
        setOpen(true);
        
      } catch (error) {
        console.log(error);
      }
    }else {
      setAlert({
        type: "error",
        message: error.message
      });
      setLoad(false);
      setOpen(true);
      setDisable(false);
    }

  };

  const OPTIONS = {
    hidePostalCode: true
  };


  return <>
    <div style={{ maxWidth: "400px", margin: "0 auto",width: "90%" }}>
          <CardElement options={OPTIONS} />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{marginTop :"1rem",float :"right"}}
            disabled={!stripe}
            onClick={handleSubmit}>
              Pay Now{load && <CircularProgress size={".8rem"} style={{marginLeft:".8rem",color: "white"}}/>}
          </Button>
    </div>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.type}>
            {alert.message}
          </Alert>
    </Snackbar>
    </>
};