import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    console.log('Card Number:', cardNumber);
    console.log('Card Holder Name:', cardHolderName);
    console.log('Expiry Month:', expiryMonth);
    console.log('Expiry Year:', expiryYear);
    console.log('CVV:', cvvNumber);
    console.log('Payment processing...');
    setTimeout(() => {
      console.log('Payment successful!');
      navigate('/printTicket'); // Redirect to the PrintTicket component
    }, 2000); // Simulating payment processing time
  };

  return (
    <section className="payment-container">
      <h2>Payment Details</h2>
      <div className="form-row">
        <label htmlFor="card_number">CARD NUMBER</label>
        <input
          type="text"
          id="card_number"
          name="card_number"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="card_holder_name">CARDHOLDER NAME</label>
        <input
          type="text"
          id="card_holder_name"
          name="card_holder_name"
          placeholder="Card Holder Name"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <div className="col-md-6">
          <label htmlFor="expiry_month">EXPIRY MONTH</label>
          <select
            id="expiry_month"
            name="expiry_month"
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
          >
            <option value="">Month</option>
            {[...Array(12).keys()].map((month) => (
              <option key={month + 1} value={`0${month + 1}`.slice(-2)}>{`0${month + 1}`.slice(-2)}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="expiry_year">EXPIRY YEAR</label>
          <select
            id="expiry_year"
            name="expiry_year"
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
          >
            <option value="">Year</option>
            {[...Array(21).keys()].map((year) => (
              <option key={2021 + year} value={2021 + year}>{2021 + year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="cvv_number">CVV</label>
        <input
          type="text"
          id="cvv_number"
          name="cvv_number"
          placeholder="CVV"
          value={cvvNumber}
          onChange={(e) => setCvvNumber(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Pay Now
      </button>
    </section>
  );
};

export default PaymentForm;
