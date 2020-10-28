import React,{useState,useEffect} from 'react';

import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

export default () => {
  const [sdkReady, setSdkReady] = useState(false);

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


  useEffect(() => {
    addPayPalScript();
  }, []);


  return (
    <>
      <h1>This is test Page</h1>
      {sdkReady &&
        <PayPalButton
          amount="0.01"
          // shippingPreference="NO_SHIPPING" 
          onSuccess={async (details, data) => {

            console.log(details);
            console.log("#####")
            console.log(data);

            const res = await axios.post("/api/payment/paypal", {
              id: data.orderID,
              intent: details.intent,
              email: details.payer.email_address,
              status: details.status,
              time: details.update_time
            })
            console.log(res.data);
          }}
        />}
    </>
  );
};

