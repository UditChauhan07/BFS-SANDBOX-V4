import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { originAPi } from "../../lib/store";
import Loading from "../Loading";
import Styles from "./Styles.module.css";
import { GetAuthData, OrderPlaced, fetchBeg } from "../../lib/store";
import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { useCart } from "../../context/CartContent";

const StripePay = ({ PK_KEY, SK_KEY, amount, PONumber, description,billingAddress ,billingPhone}) => {
  const stripePromise = loadStripe(PK_KEY);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [access_token, setAccessToken] = useState(null);
  const [inputName, setInputName] = useState(''); 
  const { order ,deleteOrder} = useCart();
  const navigate = useNavigate();


const clientSecret=localStorage.getItem('clientSecret')
  useEffect(() => {
    const createOrder = async () => {
      setIsLoading(true);
      const fetchBag = fetchBeg({});
      try {
        const user = await GetAuthData();
        console.log(user.data.x_access_token,";;;;;;;;;;;;;;;")
        setAccessToken(user.x_access_token);

        const SalesRepId =
          localStorage.getItem("Sales_Rep__c") ?? user.Sales_Rep__c;

        if (order) {
          let list = [];
          let orderType = "Wholesale Numbers";
          if (order.items.length) {
            order.items.map((product) => {
              let productCategory =
                product?.Category__c?.toUpperCase()?.trim();
              if (
                productCategory?.toUpperCase()?.includes("PREORDER") ||
                productCategory?.toUpperCase()?.match("EVENT")?.length > 0
              ) {
                orderType = "Pre Order";
              }
              let temp = {
                Id: product.Id,
                ProductCode: product.ProductCode,
                qty: product.qty,
                price: product?.price,
                discount: product?.discount,
              };
              list.push(temp);
            });
          }
          let begToOrder = {
            AccountId: order?.Account?.id,
            Name: order?.Account?.name,
            ManufacturerId__c: order?.Manufacturer?.id,
            PONumber: PONumber,
            desc: description,
            PaymentId__c: null,
            Payment_Status__c: null,
            SalesRepId: localStorage.getItem("Sales_Rep__c"),
            Type: orderType,
            ShippingCity: order?.Account?.address?.city,
            ShippingStreet: order?.Account?.address?.street,
            ShippingState: order?.Account?.address?.state,
            ShippingCountry: order?.Account?.address?.country,
            ShippingZip: order?.Account?.address?.postalCode,
            list,
            key: user.data.x_access_token,
            shippingMethod: order.Account.shippingMethod
          };
          const response = await OrderPlaced({ order: begToOrder });
          console.log(response,"response order response")
          if (response) {
            setOrderId(response);
            await createPaymentIntent(amount, response, user.data.x_access_token);
          } else {
            let status = deleteOrder();
            navigate("/order-list");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

  

    const createPaymentIntent = async (amount, orderId, access_token) => {
      console.log(amount,orderId,access_token,"llllllllllllllllll")
      try {
        const paymentResponse = await fetch(
          `${originAPi}/stripe/payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount,
              SK_KEY: SK_KEY,
              orderId,
              access_token,
            }),
          }
        );
        const paymentData = await paymentResponse.json();
        const { clientSecret } = paymentData;
        console.log(clientSecret,"clientsecret")
        if (clientSecret && clientSecret.startsWith('pi_')) {
          localStorage.setItem('clientSecret', clientSecret); 
          console.error("Invalid clientSecret format:", clientSecret);
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createOrder();
  }, [PK_KEY, SK_KEY, amount, PONumber, description]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        borderColor: '#000000',
    },
    },
  };

  if (isLoading || !clientSecret) {
    return (
      <div style={{
        height: "30vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}>
          <ContentLoader height={100} width={100} />
          <ContentLoader height={100} width={100} />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}>
          <ContentLoader height={100} width={100} />
          <ContentLoader height={100} width={100} />
        </div>
      </div>
      
      
    );
  }

  return (
    <div className={Styles.StripePaymentForm}>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            clientSecret={clientSecret}
            orderDes={description}
            PONumber={PONumber}
            orderId={orderId}
            amount={amount}
            userName={inputName} 
            billingAddress={billingAddress}
            billingPhone={billingPhone}
          />
        </Elements>
      ) : (
        <div>Missing Stripe keys or client secret</div>
      )}
    </div>
  );
};

export default StripePay;
