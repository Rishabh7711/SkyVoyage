import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FlightOptions.css';
import api from '../api';

const FlightOptions = () => {
  const navigate = useNavigate();
  const [flightOptions, setFlightOptions] = useState([]);

  useEffect(() => {
    fetchFlightOptions();
  }, []);

  const fetchFlightOptions = async () => {
    try {
      const response = await api.get('/flights/');
      setFlightOptions(response.data);
    } catch (error) {
      console.error('Error fetching flight options:', error);
    }
  };

  const handleFlightSelection = (flight) => {
    navigate('/seatSelection', { state: { selectedFlight: flight } });
  };

  return (
    <div className="flight-options">
      <h2>Select a Flight</h2>
      {flightOptions.map((flight) => (
        <div
          key={flight.id}
          className="flight-option"
          onClick={() => handleFlightSelection(flight)}
        >
          <div className="flight-details">
            <h3>{flight.airline} - {flight.flight_number}</h3>
            <p>Departure: {flight.departure_date}</p>
            <p>Arrival: {flight.arrival_time}</p>
            <p>Duration: {flight.duration}</p>
          </div>
          <div className="flight-price">${flight.price}</div>
        </div>
      ))}
    </div>
  );
};

export default FlightOptions;
