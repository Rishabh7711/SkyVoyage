import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchFlight.css';
import api from '../api';

const SearchFlight = () => {
  const navigate = useNavigate();
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.get('/flights/', {
        params: {
          departure_city: departureCity,
          destination_city: destinationCity,
          departure_date: departureDate,
        },
      });

      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSelection = () => {
    // Pass the flight data to the FlightOptions component
    navigate('/flight', { state: { flights } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-flight">
        <h2>Search Flights</h2>
        <div className="form-group">
          <label htmlFor="departureCity">Departure City</label>
          <input
            type="text"
            id="departureCity"
            value={departureCity}
            onChange={(event) => setDepartureCity(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destinationCity">Destination City</label>
          <input
            type="text"
            id="destinationCity"
            value={destinationCity}
            onChange={(event) => setDestinationCity(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>
      {flights.length > 0 && (
        <div className="flight-results">
          <h3>Available Flights</h3>
          <button onClick={handleFlightSelection}>Select Flight</button>
        </div>
      )}
    </div>
  );
};

export default SearchFlight;
