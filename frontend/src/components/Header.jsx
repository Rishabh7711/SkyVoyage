import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Simulate a login process
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    }, 2000); // Adjust the delay as needed
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the home page after logout
  };

  const handleNavigation = (path) => {
    if (!isLoggedIn && path !== '/' && path !== '/login' && path !== '/register') {
      alert('Please log in to access this page.');
      navigate('/');
    } else {
      navigate(path);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/" onClick={() => handleNavigation('/')}>
          SkyVoyage
          </Link>
        </div>
        <div className={`menu-icon ${showMenu ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {isLoggedIn && (
          <ul className={`nav-menu ${showMenu ? 'show' : ''}`}>
            <li>
              <Link to="/" onClick={() => handleNavigation('/')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={() => handleNavigation('/search')}>
                Search
              </Link>
            </li>
            <li>
              <Link to="/flight" onClick={() => handleNavigation('/flight')}>
                Flights
              </Link>
            </li>
            <li>
              <Link to="/seatSelection" onClick={() => handleNavigation('/seatSelection')}>
                Seat Selection
              </Link>
            </li>
            {/* <li>
              <Link to="/bookingConfirm" onClick={() => handleNavigation('/bookingConfirm')}>
                Booking
              </Link>
            </li> */}
            {/* <li>
              <Link to="/payment" onClick={() => handleNavigation('/payment')}>
                Payment
              </Link>
            </li> */}
            <div className="login-signup">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </ul>
        )}
        {!isLoggedIn && (
          <div className="login-signup">
            {isLoggingIn ? (
              <span>Logging in...</span>
            ) : (
              <>
                <Link to="/login" onClick={handleLogin}>
                  Login
                </Link>
                <Link to="/register" onClick={() => handleNavigation('/register')}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;