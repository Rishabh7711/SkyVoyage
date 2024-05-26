import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SeatSelection.css';

const SeatSelection = ({ flight }) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [fireExitResponsibility, setFireExitResponsibility] = useState(false);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);
  const [seatLockTimer, setSeatLockTimer] = useState(null);
  const [confirmedSeats, setConfirmedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(['1A', '2B', '5C', '12D']); // Example booked seats
  const [showFireExitModal, setShowFireExitModal] = useState(false);

  const classPrices = {
    first: 1000, // Changed the price for first class
    business: 500, // Changed the price for business class
    economy: 200, // Changed the price for economy class
  };

  const seatStructure = {
    first: { rows: 4, seats: [2, 2], layout: ['TT', 'SS', 'SS', 'KK'] },
    business: { rows: 6, seats: [2, 2], layout: ['SS', 'SS', 'SS', 'SS', 'SS', 'EE'] },
    economy: { rows: 20, seats: [3, 3], layout: ['SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'SSS', 'EE', 'TT'] },
  };

  const fireExitSeats = {
    first: ['1A', '1B', '2A', '2B'],
    business: ['5A', '5B', '6A', '6B'],
    economy: ['12A', '12B', '12C', '13A', '13B', '13C'],
  };

  useEffect(() => {
    if (isBookingInProgress) {
      const timer = setTimeout(() => {
        setSelectedSeats([]);
        setIsBookingInProgress(false);
        alert('Your selected seats have been released due to inactivity.');
      }, 600000);

      return () => clearTimeout(timer);
    }
  }, [isBookingInProgress]);

  const handleSeatClick = (seatId, classType) => {
    if (bookedSeats.includes(seatId)) {
      alert('This seat is already booked.');
      return;
    }

    if (fireExitSeats[classType].includes(seatId) && !fireExitResponsibility) {
      setShowFireExitModal(true);
      return;
    }

    if (selectedSeats.length >= 6 && !selectedSeats.includes(seatId)) {
      alert('You cannot book more than 6 seats at once.');
      return;
    }

    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(seat => seat !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(newSelectedSeats);
    setTicketPrice(calculateTicketPrice(newSelectedSeats, classPrices));

    setIsBookingInProgress(true);
    clearTimeout(seatLockTimer);
    setSeatLockTimer(setTimeout(() => {
      setSelectedSeats([]);
      setIsBookingInProgress(false);
      alert('Your selected seats have been released due to inactivity.');
    }, 600000));
  };

  const handleFireExitResponsibilityChange = (event) => {
    setFireExitResponsibility(event.target.checked);
    setShowFireExitModal(false);
  };

  const calculateTicketPrice = (selectedSeats, classPrices) => {
    const classTypes = selectedSeats.map(seatId => getClassType(seatId));
    const uniqueClassTypes = [...new Set(classTypes)];

    return uniqueClassTypes.reduce((total, classType) => {
      const seatsOfType = selectedSeats.filter(seatId => getClassType(seatId) === classType);
      return total + seatsOfType.length * classPrices[classType];
    }, 0);
  };

  const getClassType = (seatId) => {
    const rowNumber = parseInt(seatId.match(/\d+/)[0], 10);
    if (rowNumber <= 4) return 'first';
    if (rowNumber <= 10) return 'business';
    return 'economy';
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before booking.');
      return;
    }
    setConfirmedSeats([...confirmedSeats, ...selectedSeats]);
    setSelectedSeats([]);

    navigate('/bookingConfirm', { state: { selectedFlight: flight, selectedSeats, ticketPrice } });
  };

  const handleCancellation = (seatId) => {
    if (isWithinCancellationPeriod()) {
      setConfirmedSeats(confirmedSeats.filter(seat => seat !== seatId));
      setBookedSeats(bookedSeats.filter(seat => seat !== seatId));
    } else {
      alert('Tickets cannot be cancelled within 72 hours of departure.');
    }
  };

  const isWithinCancellationPeriod = () => {
    const currentTime = new Date();
    const departureTime = new Date(flight.departureTime);
    const timeDifference = departureTime - currentTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference > 72;
  };

  const renderSeats = (classType, { rows, seats, layout }) => {
    const seatRows = [];
    let rowNumber = 1;
    if (classType === 'business') rowNumber = 5;
    else if (classType === 'economy') rowNumber = 12;

    for (let row = 1; row <= rows; row++) {
      const seatRow = [];
      const leftSeats = [];
      const rightSeats = [];

      for (let seat = 1; seat <= seats[0]; seat++) {
        const seatId = `${rowNumber}${String.fromCharCode(64 + seat)}`;
        const seatClass = selectedSeats.includes(seatId)
          ? 'selected'
          : bookedSeats.includes(seatId)
          ? 'booked'
          : confirmedSeats.includes(seatId)
          ? 'confirmed'
          : 'available';

        leftSeats.push(
          <div
            key={`left-${seatId}`}
            className={`seat ${seatClass}`}
            onClick={() => handleSeatClick(seatId, classType)}
          >
            {seatId}
          </div>
        );
      }

      for (let seat = seats[0] + 1; seat <= seats[0] + seats[1]; seat++) {
        const seatId = `${rowNumber}${String.fromCharCode(64 + seat)}`;
        const seatClass = selectedSeats.includes(seatId)
          ? 'selected'
          : bookedSeats.includes(seatId)
          ? 'booked'
          : confirmedSeats.includes(seatId)
          ? 'confirmed'
          : 'available';

        rightSeats.push(
          <div
            key={`right-${seatId}`}
            className={`seat ${seatClass}`}
            onClick={() => handleSeatClick(seatId, classType)}
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

    // Adding back toilets, kitchens, and exits
    seatRows.push(
      <div className="row" key={`${classType}-back`}>
        <div className="toilet" key={`toilet-back-${classType}`}>Toilet</div>
        <div className="kitchen" key={`kitchen-back-${classType}`}>Kitchen</div>
        <div className="exit" key={`exit-back-${classType}`}>Exit</div>
      </div>
    );

    return seatRows;
  };

  return (
    <div className="seat-selection">
      {showFireExitModal && (
        <div className="fire-exit-modal">
          <div className="modal-content">
            <h2>Fire Exit Responsibility</h2>
            <p>
              You have selected a fire exit seat. Please confirm that you accept the fire exit responsibility and the related financial implications.
            </p>
            <div>
              <input
                type="checkbox"
                id="fire-exit-responsibility"
                checked={fireExitResponsibility}
                onChange={handleFireExitResponsibilityChange}
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
            {renderSeats('first', seatStructure.first)}
          </div>
          <div className="cabin business-class">
            <h2>Business Class</h2>
            {renderSeats('business', seatStructure.business)}
          </div>
          <div className="cabin economy-class">
            <h2>Economy Class</h2>
            {renderSeats('economy', seatStructure.economy)}
          </div>
        </div>
      </div>
      <div className="booking-footer">
        <div className="ticket-price">
          Ticket Price: {ticketPrice}$
        </div>
        <button onClick={handleBooking} disabled={!selectedSeats.length}>
          Book Selected Seats
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;