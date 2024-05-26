import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/BookingConfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const { selectedFlight, selectedSeats, ticketPrice } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [passengerData, setPassengerData] = useState([
    {
      name: '',
      age: '',
      email: '',
      contactDetails: '',
      discount: 0,
    },
  ]);

  const handleConfirmation = () => {
    setShowPopup(true);
  };

  const handleInputChange = (index, e) => {
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index][e.target.name] = e.target.value;
    updatedPassengerData[index].discount = calculateDiscount(updatedPassengerData[index].age);
    setPassengerData(updatedPassengerData);
  };

  const calculateDiscount = (age) => {
    if (age <= 15) {
      return ticketPrice * 0.25; // 25% discount for passengers aged 15 or below
    }
    return 0;
  };

  const addPassenger = () => {
    setPassengerData([...passengerData, { name: '', age: '', email: '', contactDetails: '', discount: 0 }]);
  };

  const totalDiscountedPrice = passengerData.reduce(
    (total, passenger) => total - passenger.discount,
    ticketPrice
  );

  return (
    <div className="container">
      <div className="booking-confirmation">
        <h2>Booking Confirmation</h2>
        <p>Please enter your details and confirm your booking.</p>
        <div className="passenger-details">
          <h3>Passenger Details:</h3>
          {passengerData.map((passenger, index) => (
            <div key={index} className="passenger-form">
              <h4>Passenger {index + 1}</h4>
              <form>
                <div className="form-group">
                  <label htmlFor={`name-${index}`} className="form-label">Name:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      id={`name-${index}`}
                      name="name"
                      value={passenger.name}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor={`age-${index}`} className="form-label">Age:</label>
                  <div className="input-container">
                    <input
                      type="number"
                      id={`age-${index}`}
                      name="age"
                      value={passenger.age}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor={`email-${index}`} className="form-label">Email:</label>
                  <div className="input-container">
                    <input
                      type="email"
                      id={`email-${index}`}
                      name="email"
                      value={passenger.email}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor={`contactDetails-${index}`} className="form-label">Contact Details:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      id={`contactDetails-${index}`}
                      name="contactDetails"
                      value={passenger.contactDetails}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          ))}
          <button className="btn" onClick={addPassenger}>
            Add Passenger
          </button>
        </div>
        <div className="booking-details">
          <h3>Booking Details:</h3>
          <div className="form-group">
            <label htmlFor="selectedSeats" className="form-label">Selected Seats:</label>
            <div className="input-container">
              <input
                type="text"
                id="selectedSeats"
                name="selectedSeats"
                value={selectedSeats ? selectedSeats.join(', ') : ''}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="ticketPrice" className="form-label">Ticket Price:</label>
            <div className="input-container">
              <input
                type="number"
                id="ticketPrice"
                name="totalPrice"
                value={ticketPrice}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="totalDiscountedPrice" className="form-label">Total Discounted Price:</label>
            <div className="input-container">
              <input
                type="number"
                id="totalDiscountedPrice"
                name="totalDiscountedPrice"
                value={totalDiscountedPrice}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="btn" onClick={handleConfirmation}>
            Confirm Booking
          </button>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Booking Confirmed!</h3>
              <p>Your booking has been confirmed. Please proceed to make the payment.</p>
              <div className="popup-buttons">
                <Link to="/payment" state={{ totalDiscountedPrice }} className="btn">
                  Payment
                </Link>
                <button className="btn" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;