import React from 'react';

import axios from "axios";

import Modal from "./pages/Bills/Modal";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51HgZQIDb5IfsHukvjCC40Ha3u9cIlUn1CTUjOldodyvcHObdplUEpWBNCpLELMwYedX0u9LwitGjZb9DeGoAagTq00tM6Ck9LC");

export default () => {

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <h1>This is test Page</h1>
      <Elements stripe={stripePromise}>
      <CheckoutForm />
      </Elements>
       <button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <Modal open={open} setOpen={setOpen} />
    </>
  );
};


const CheckoutForm = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    console.log(error);
    console.log("------");
    console.log(paymentMethod);

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post("/api/payment/stripe", { id, amount: 1099 * 100});
        console.log(data);
        // success();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>Price: $10.99 USD</h2>
      <img
        src="https://images.ricardocuisine.com/services/recipes/500x675_7700.jpg"
        alt="ig"
        style={{ maxWidth: "50px" }}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};