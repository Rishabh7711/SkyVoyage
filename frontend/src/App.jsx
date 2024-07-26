import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import SeatSelection from './pages/SeatSelection';
import SearchFlight from './pages/SearchFlight';
import Payment from './pages/Payment';
import Header from './components/Header';
import Footer from './components/Footer';
import backgroundImage from './assets/flight.webp';
import FlightOptions from './pages/FlightOptions';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
};


function App() {
  return (
    <BrowserRouter>
      <div style={backgroundStyle}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
              <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />  
            <Route path="/seatSelection" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchFlight /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/flight" element={<ProtectedRoute><FlightOptions /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
