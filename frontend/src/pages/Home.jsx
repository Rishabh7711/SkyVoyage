import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import destination1 from '../assets/destination1.jpg';
import destination2 from '../assets/destination2.webp';
import destination3 from '../assets/destination3.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const modalRef = useRef(null);

  const searchFlight = () => {
    navigate('/search');
  };

  const featuredDestinations = [
    {
      image: destination1,
      title: 'Barcelona',
      description: "The vibrant hues of Gaudí’s masterpieces, the tantalizing aroma of paella by the beach, and the rhythmic beats of flamenco echoing through the streets  welcome to Barcelona! As one of the cheapest places to fly from the UK, this Catalan jewel offers a blend of rich history and modern flair, making it an irresistible escape for many",
    },
    {
      image: destination2,
      title: 'Berlin',
      description: "Drenched in tales of yesteryears and buzzing with contemporary energy, Berlin is a siren song for the intrepid explorer. Ranking high among the cheapest places to fly from the UK, this German metropolis seamlessly weaves its rich heritage with a dynamic, modern-day ethos. Envision meandering through lanes echoing historical sagas, only to encounter a trailblazing art exhibit or a spontaneous music gig.",
    },
    {
      image: destination3,
      title: 'Warsaw',
      description: "A fusion of time-honored traditions and contemporary flair, Warsaw stands as a beacon of Europe’s enduring spirit. Ranking among the cheapest places to fly from the UK, this Polish metropolis promises a deep dive into cultural riches without straining the purse strings. Its competitive airfare, when compared to other European cities, owes much to airlines like Wizz Air and Ryanair, who have recognized and championed Warsaw’s emerging appeal.",
    },
  ];

  const openModal = (destination) => {
    setCurrentDestination(destination);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentDestination(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="main-content">
      <section className="container mx-auto py-12">
        <div className="form-section grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="explore-section">
            <div className="card bg-white rounded-lg shadow-md p-6">
              <button className="cta-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={searchFlight}>
                Book Now
              </button>
            </div>
          </div>
          <div className="destinations-section">
            <div className="card bg-white rounded-lg shadow-md p-6">
              <h2 className="title font-bold text-2xl mb-4">Featured Destinations</h2>
              <div className="destinations-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredDestinations.map((destination, index) => (
                  <div key={index} className="destination-card">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="destination-img w-full h-48 object-cover rounded-t-lg cursor-pointer"
                      onClick={() => openModal(destination)}
                    />
                    <div className="destination-info p-4">
                      <h3 className="destination-title font-bold text-lg mb-2">{destination.title}</h3>
                      <p className="destination-desc text-sm">{destination.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalVisible && (
        <div className="modal-overlay" ref={modalRef}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{currentDestination.title}</h3>
              <button onClick={closeModal} className="close-button">
                <svg className="close-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <img src={currentDestination.image} alt={currentDestination.title} className="modal-image" />
              <p>{currentDestination.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
