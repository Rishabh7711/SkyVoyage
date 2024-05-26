import React from 'react';
import '../styles/SeatMap.css';

const SeatMap = ({ selectedSeats, seatStructure, handleSeatClick }) => {
  const bookedSeats = ['1A', '2B', '5C', '12D']; // Example booked seats
  const confirmedSeats = ['3A', '4B', '6C', '14D']; // Example confirmed seats

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
            onClick={() => handleSeatClick(seatId, classType, bookedSeats)}
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
            onClick={() => handleSeatClick(seatId, classType, bookedSeats)}
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
  );
};

export default SeatMap;
