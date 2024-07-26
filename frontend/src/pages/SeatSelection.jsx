import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SeatSelection.css';

const SeatPicker = ({ selectedFlight }) => {
  const navigate = useNavigate();
  const [chosenSeats, setChosenSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fireExitAccepted, setFireExitAccepted] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [seatTimer, setSeatTimer] = useState(null);
  const [confirmedSeats, setConfirmedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState(['1A', '2B', '5C', '12D']);
  const [showFireExitModal, setShowFireExitModal] = useState(false);

  const seatPrices = {
    first: 1000,
    business: 500,
    economy: 200,
  };

  const seatLayouts = {
    first: { rows: 1, seats: [1, 1], layout: ['SS', 'SS', 'SS', 'SS'] },
    business: { rows: 2, seats: [2, 2], layout: ['SS', 'SS', 'SS', 'SS', 'SS', 'SS'] },
    economy: { rows: 2, seats: [3, 3], layout: ['SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS'] },
  };

  const fireExitSeats = {
    first: ['1A', '1B', '2A', '2B'],
    business: ['5A', '5B', '6A', '6B'],
    economy: ['10A', '10B', '10C'],
  };

  useEffect(() => {
    if (bookingInProgress) {
      const timer = setTimeout(() => {
        setChosenSeats([]);
        setBookingInProgress(false);
        alert('Your selected seats have been released due to inactivity.');
      }, 600000);

      return () => clearTimeout(timer);
    }
  }, [bookingInProgress]);

  const handleSeatSelection = (seatId, classType) => {
    if (reservedSeats.includes(seatId)) {
      alert('This seat is already reserved.');
      return;
    }

    if (fireExitSeats[classType].includes(seatId) && !fireExitAccepted) {
      setShowFireExitModal(true);
      return;
    }

    if (chosenSeats.length >= 6 && !chosenSeats.includes(seatId)) {
      alert('You cannot select more than 6 seats at once.');
      return;
    }

    const newSelectedSeats = chosenSeats.includes(seatId)
      ? chosenSeats.filter(seat => seat !== seatId)
      : [...chosenSeats, seatId];

    setChosenSeats(newSelectedSeats);
    setTotalPrice(calculateTotalPrice(newSelectedSeats, seatPrices));

    setBookingInProgress(true);
    clearTimeout(seatTimer);
    setSeatTimer(setTimeout(() => {
      setChosenSeats([]);
      setBookingInProgress(false);
      alert('Your selected seats have been released due to inactivity.');
    }, 600000));
  };

  const handleFireExitAcceptance = (event) => {
    setFireExitAccepted(event.target.checked);
    setShowFireExitModal(false);
  };

  const calculateTotalPrice = (chosenSeats, seatPrices) => {
    const classTypes = chosenSeats.map(seatId => determineClassType(seatId));
    const uniqueClassTypes = [...new Set(classTypes)];

    return uniqueClassTypes.reduce((total, classType) => {
      const seatsOfType = chosenSeats.filter(seatId => determineClassType(seatId) === classType);
      return total + seatsOfType.length * seatPrices[classType];
    }, 0);
  };

  const determineClassType = (seatId) => {
    const rowNumber = parseInt(seatId.match(/\d+/)[0], 10);
    if (rowNumber <= 4) return 'first';
    if (rowNumber <= 10) return 'business';
    return 'economy';
  };

  const handleProceedToPayment = () => {
    if (chosenSeats.length === 0) {
      alert('Please select at least one seat before proceeding to payment.');
      return;
    }
    setConfirmedSeats([...confirmedSeats, ...chosenSeats]);
    setChosenSeats([]);

    navigate('/payment', { state: { selectedFlight, chosenSeats, totalPrice } });
  };

  const handleSeatCancellation = (seatId) => {
    if (canCancelBooking()) {
      setConfirmedSeats(confirmedSeats.filter(seat => seat !== seatId));
      setReservedSeats(reservedSeats.filter(seat => seat !== seatId));
    } else {
      alert('Tickets cannot be cancelled within 72 hours of departure.');
    }
  };

  const canCancelBooking = () => {
    const currentTime = new Date();
    const departureTime = new Date(selectedFlight.departureTime);
    const timeDifference = departureTime - currentTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference > 72;
  };

  const renderSeatLayout = (classType, { rows, seats, layout }) => {
    const seatRows = [];
    let rowNumber = 1;
    if (classType === 'business') rowNumber = 5;
    else if (classType === 'economy') rowNumber = 11;

    for (let row = 1; row <= rows; row++) {
      const seatRow = [];
      const leftSeats = [];
      const rightSeats = [];

      for (let seat = 1; seat <= seats[0]; seat++) {
        const seatId = `${rowNumber}${String.fromCharCode(64 + seat)}`;
        const seatClass = chosenSeats.includes(seatId)
          ? 'selected'
          : reservedSeats.includes(seatId)
          ? 'reserved'
          : confirmedSeats.includes(seatId)
          ? 'confirmed'
          : 'available';

        leftSeats.push(
          <div
            key={`left-${seatId}`}
            className={`seat ${seatClass}`}
            onClick={() => handleSeatSelection(seatId, classType)}
          >
            {seatId}
          </div>
        );
      }

      for (let seat = seats[0] + 1; seat <= seats[0] + seats[1]; seat++) {
        const seatId = `${rowNumber}${String.fromCharCode(64 + seat)}`;
        const seatClass = chosenSeats.includes(seatId)
          ? 'selected'
          : reservedSeats.includes(seatId)
          ? 'reserved'
          : confirmedSeats.includes(seatId)
          ? 'confirmed'
          : 'available';

        rightSeats.push(
          <div
            key={`right-${seatId}`}
            className={`seat ${seatClass}`}
            onClick={() => handleSeatSelection(seatId, classType)}
          >
            {seatId}
          </div>
        );
      }

      if (layout[row - 1] === 'TT') {
        seatRow.push(<div className="toilet" key={`toilet-${rowNumber}`}>Toilet</div>);
      } else if (layout[row - 1] === 'KK') {
        seatRow.push(<div className="kitchen" key={`kitchen-${rowNumber}`}>Kitchen</div>);
      } else if (layout[row - 1] === 'EE') {
        seatRow.push(<div className="exit" key={`exit-${rowNumber}`}>Exit</div>);
      } else {
        seatRow.push(
          <div className="left-seats" key={`left-${rowNumber}`}>
            {leftSeats}
          </div>
        );
        seatRow.push(<div className="aisle" key={`aisle-${rowNumber}`}></div>);
        seatRow.push(
          <div className="right-seats" key={`right-${rowNumber}`}>
            {rightSeats}
          </div>
        );
      }

      seatRows.push(
        <div className="row" key={`${classType}-${rowNumber}`}>
          {seatRow}
        </div>
      );

      rowNumber++;
    }

    return seatRows;
  };

  return (
    <div className="seat-picker">
      {showFireExitModal && (
        <div className="fire-exit-modal">
          <div className="modal-content">
            <h2>Fire Exit Responsibility</h2>
            <p>
              You have selected a fire exit seat. Please confirm that you accept the fire exit responsibility and the related financial implications.
            </p>
            <div className="fire-exit-responsibility">
              <input
                type="checkbox"
                id="fire-exit-responsibility"
                checked={fireExitAccepted}
                onChange={handleFireExitAcceptance}
              />
              <label htmlFor="fire-exit-responsibility">
                I accept the fire exit responsibility and the related financial implications.
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="seat-map-container">
        <div className="seat-map">
          <div className="cabin first-class">
            <h2>First Class</h2>
            {renderSeatLayout('first', seatLayouts.first)}
          </div>
          <div className="cabin business-class">
            <h2>Business Class</h2>
            {renderSeatLayout('business', seatLayouts.business)}
          </div>
          <div className="cabin economy-class">
            <h2>Economy Class</h2>
            {renderSeatLayout('economy', seatLayouts.economy)}
          </div>
        </div>
        <div className="booking-footer">
          <div className="total-price">
            Total Price: {totalPrice}$
          </div>
          <div className="booked-seats">
            <h3>Booked Seats:</h3>
            <ul>
              {confirmedSeats.map((seat) => (
                <li key={seat}>
                  {seat}
                  <button onClick={() => handleSeatCancellation(seat)}>Cancel</button>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleProceedToPayment}
            disabled={!chosenSeats.length && !confirmedSeats.length}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatPicker;
