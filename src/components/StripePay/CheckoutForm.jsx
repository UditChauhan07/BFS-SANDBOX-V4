import { PaymentElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import Styles from "./Styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { GetAuthData } from "../../lib/store";
import { useCart } from "../../context/CartContent";
const CheckoutForm = ({ clientSecret, amount, userName,billingAddress,billingPhone}) =>{
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState(userName || "");
  const [isPaymentVisible, setIsPaymentVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
   const {deleteOrder}=useCart();

  const handleToggle = () => {
    setIsPaymentVisible((prev) => !prev);
  };
    const handleSubmit = async (event) => {
    event.preventDefault();
      
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    setIsLoading(true);
    const countryCodeMapping = {
      "Afghanistan": "AF",
      "Albania": "AL",
      "Algeria": "DZ",
      "Andorra": "AD",
      "Angola": "AO",
      "Antigua and Barbuda": "AG",
      "Argentina": "AR",
      "Armenia": "AM",
      "Australia": "AU",
      "Austria": "AT",
      "Azerbaijan": "AZ",
      "Bahamas": "BS",
      "Bahrain": "BH",
      "Bangladesh": "BD",
      "Barbados": "BB",
      "Belarus": "BY",
      "Belgium": "BE",
      "Belize": "BZ",
      "Benin": "BJ",
      "Bhutan": "BT",
      "Bolivia": "BO",
      "Bosnia and Herzegovina": "BA",
      "Botswana": "BW",
      "Brazil": "BR",
      "Brunei": "BN",
      "Bulgaria": "BG",
      "Burkina Faso": "BF",
      "Burundi": "BI",
      "Cabo Verde": "CV",
      "Cambodia": "KH",
      "Cameroon": "CM",
      "Canada": "CA",
      "Central African Republic": "CF",
      "Chad": "TD",
      "Chile": "CL",
      "China": "CN",
      "Colombia": "CO",
      "Comoros": "KM",
      "Congo, Democratic Republic of the": "CD",
      "Congo, Republic of the": "CG",
      "Costa Rica": "CR",
      "Croatia": "HR",
      "Cuba": "CU",
      "Cyprus": "CY",
      "Czech Republic": "CZ",
      "Denmark": "DK",
      "Djibouti": "DJ",
      "Dominica": "DM",
      "Dominican Republic": "DO",
      "Ecuador": "EC",
      "Egypt": "EG",
      "El Salvador": "SV",
      "Equatorial Guinea": "GQ",
      "Eritrea": "ER",
      "Estonia": "EE",
      "Eswatini": "SZ",
      "Ethiopia": "ET",
      "Fiji": "FJ",
      "Finland": "FI",
      "France": "FR",
      "Gabon": "GA",
      "Gambia": "GM",
      "Georgia": "GE",
      "Germany": "DE",
      "Ghana": "GH",
      "Greece": "GR",
      "Grenada": "GD",
      "Guatemala": "GT",
      "Guinea": "GN",
      "Guinea-Bissau": "GW",
      "Guyana": "GY",
      "Haiti": "HT",
      "Honduras": "HN",
      "Hungary": "HU",
      "Iceland": "IS",
      "India": "IN",
      "Indonesia": "ID",
      "Iran": "IR",
      "Iraq": "IQ",
      "Ireland": "IE",
      "Israel": "IL",
      "Italy": "IT",
      "Jamaica": "JM",
      "Japan": "JP",
      "Jordan": "JO",
      "Kazakhstan": "KZ",
      "Kenya": "KE",
      "Kiribati": "KI",
      "Korea, North": "KP",
      "Korea, South": "KR",
      "Kuwait": "KW",
      "Kyrgyzstan": "KG",
      "Laos": "LA",
      "Latvia": "LV",
      "Lebanon": "LB",
      "Lesotho": "LS",
      "Liberia": "LR",
      "Libya": "LY",
      "Liechtenstein": "LI",
      "Lithuania": "LT",
      "Luxembourg": "LU",
      "Madagascar": "MG",
      "Malawi": "MW",
      "Malaysia": "MY",
      "Maldives": "MV",
      "Mali": "ML",
      "Malta": "MT",
      "Marshall Islands": "MH",
      "Mauritania": "MR",
      "Mauritius": "MU",
      "Mexico": "MX",
      "Micronesia": "FM",
      "Moldova": "MD",
      "Monaco": "MC",
      "Mongolia": "MN",
      "Montenegro": "ME",
      "Morocco": "MA",
      "Mozambique": "MZ",
      "Myanmar": "MM",
      "Namibia": "NA",
      "Nauru": "NR",
      "Nepal": "NP",
      "Netherlands": "NL",
      "New Zealand": "NZ",
      "Nicaragua": "NI",
      "Niger": "NE",
      "Nigeria": "NG",
      "North Macedonia": "MK",
      "Norway": "NO",
      "Oman": "OM",
      "Pakistan": "PK",
      "Palau": "PW",
      "Palestine, State of": "PS",
      "Panama": "PA",
      "Papua New Guinea": "PG",
      "Paraguay": "PY",
      "Peru": "PE",
      "Philippines": "PH",
      "Poland": "PL",
      "Portugal": "PT",
      "Qatar": "QA",
      "Romania": "RO",
      "Russia": "RU",
      "Rwanda": "RW",
      "Saint Kitts and Nevis": "KN",
      "Saint Lucia": "LC",
      "Saint Vincent and the Grenadines": "VC",
      "Samoa": "WS",
      "San Marino": "SM",
      "Sao Tome and Principe": "ST",
      "Saudi Arabia": "SA",
      "Senegal": "SN",
      "Serbia": "RS",
      "Seychelles": "SC",
      "Sierra Leone": "SL",
      "Singapore": "SG",
      "Slovakia": "SK",
      "Slovenia": "SI",
      "Solomon Islands": "SB",
      "Somalia": "SO",
      "South Africa": "ZA",
      "South Sudan": "SS",
      "Spain": "ES",
      "Sri Lanka": "LK",
      "Sudan": "SD",
      "Suriname": "SR",
      "Sweden": "SE",
      "Switzerland": "CH",
      "Syria": "SY",
      "Taiwan": "TW",
      "Tajikistan": "TJ",
      "Tanzania": "TZ",
      "Thailand": "TH",
      "Togo": "TG",
      "Tonga": "TO",
      "Trinidad and Tobago": "TT",
      "Tunisia": "TN",
      "Turkey": "TR",
      "Turkmenistan": "TM",
      "Tuvalu": "TV",
      "Uganda": "UG",
      "Ukraine": "UA",
      "United Arab Emirates": "AE",
      "United Kingdom": "GB",
      "United States": "US",
      "Uruguay": "UY",
      "Uzbekistan": "UZ",
      "Vanuatu": "VU",
      "Vatican City": "VA",
      "Venezuela": "VE",
      "Vietnam": "VN",
      "Yemen": "YE",
      "Zambia": "ZM",
      "Zimbabwe": "ZW",
    }
    const getCountryCode = (countryName) => {
      return countryCodeMapping[countryName] || null; 
    };
    const { street, city, state, postalCode, country } = billingAddress;
    const countryCode = getCountryCode(country);
    const user = await GetAuthData();
  const email=user.data.email;
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: name,
            email:email||'test123@gmail.com', 
            phone: billingPhone, 
            address: {
              line1: street, 
              line2:'',
              city: city,
              state: state,
              postal_code: postalCode,
              country: countryCode,
            },
          },
        },
      },
      redirect: "if_required",
    });
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
      Swal.fire("Payment Failed", error.message, "error");
    } else {
      switch (paymentIntent.status) {
        case "succeeded":
          Swal.fire(
            "Payment Successful",
            "Your payment was processed successfully!",
            "success"
          );
          localStorage.removeItem("clientSecret");
          let status = deleteOrder();
          navigate("/order-list");
          break;
        case "processing":
          Swal.fire(
            "Payment Processing",
            "Your payment is being processed. Please wait...",
            "info"
          );
          break;
        case "requires_payment_method":
          Swal.fire(
            "Payment Failed",
            "Your payment was not successful. Please try again.",
            "error"
          );
          break;
        case "requires_action":
          Swal.fire(
            "Action Required",
            "Please complete the action required to finalize your payment.",
            "warning"
          );
          break;
        case "canceled":
          Swal.fire(
            "Payment Canceled",
            "Your payment has been canceled. Please try again.",
            "error"
          );
          break;
        default:
          Swal.fire(
            "Unexpected Status",
            "An unexpected status occurred. Please try again.",
            "warning"
          );
      }
    }
  };
  const paymentElementOptions = {
    fields: {
      billingDetails: 'never'
    },
    appearance: {
      theme: 'stripe',
      variables: {
        fontFamily: 'Montserrat-500', 
      },
    },
  };
  

  return (
    <div>
      <h5
        className={Styles.paymenthead}
        // onClick={handleToggle}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        Payment Details{" "}
        <FontAwesomeIcon icon={isPaymentVisible ? faAngleUp : faAngleDown} />
      </h5>

      {isPaymentVisible && (
        <div className={Styles.paymentmaindiv}>
          <form onSubmit={handleSubmit} className={Styles.form}>
            <div className={Styles.formGroup}>
              <label htmlFor="card-holder-name">Cardholder Name</label>
              <input
                type="text"
                id="card-holder-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter cardholder name"
              />
            </div>
            <div className={Styles.formGroup}>
              <PaymentElement
                className={Styles.PaymentElement}
                options={paymentElementOptions}
              />
            </div>
            {errorMessage && (
              <div className={Styles.errorMessage}>{errorMessage}</div>
            )}
          </form>
        </div>
      )}
      {isPaymentVisible && (
        <button type="submit" disabled={!stripe} className={Styles.paybtn} onClick={handleSubmit}>
        {isLoading ? 'Processing...' : "Pay and Place Order"}
        </button>
      )}
    </div>
  );
};

export default CheckoutForm;
