import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import destination1Image from '../assets/destination1.jpg';
import destination2Image from '../assets/destination2.jpg';
import destination3Image from '../assets/destination3.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const modalRef = useRef(null);

  const handleSearchFlight = () => {
    navigate('/search');
  };

  const destinations = [
    {
      image: destination1Image,
      title: 'Amalfi Coast, Italy',
      description: 'There are a few destinations in the world that make it onto every traveler\'s bucket list, and the Amalfi Coast is one of them. From legendary Positano to hilltop Ravello, the glamour of Italy\'s most famous peninsula—with its pastel-colored towns cascading down to the Mediterranean, olive groves, and endless limoncello—has not waned for centuries.',
    },
    {
      image: destination2Image,
      title: 'Provence, France',
      description: 'Lavender fields that stretch over the horizon are an iconic image of Provence, but there\'s far more beauty here than just its sweet-smelling flowers—including Michelin-starred cuisine, art studios used by names like Matisse and Cézanne, and scenic roads that pass by sugar-white beaches, mountain passes, and the glittering blues of the Mediterranean Sea.',
    },
    {
      image: destination3Image,
      title: 'The Storr, Scotland',
      description: 'The Isle of Skye, in the far west Scottish Highlands, is home to landscapes so supernatural that it\'s become a go-do backdrop for countless fantasy movies. Especially moving are the Storr, a formation of rocky pinnacles that jut out like spikes from a grassy hillside overlooking the island\'s rugged coastline. You have to hike to get there, but don\'t be deterred by the weather: Scotland\'s famous rain and mist make it look that much more magical.',
    },
  ];

  const handleImageClick = (destination) => {
    setModalContent(destination);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  useEffect(() => {
    const modal = modalRef.current;

    const handleClickOutside = (event) => {
      if (modal && !modal.contains(event.target)) {
        closeModal();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="main">
      <section className="max-w-6xl mx-auto py-12">
        <div className="form-container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="explore-field">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-2xl mb-4">Explore the World with Us</h2>
              <p className="mb-4">
                Book your next adventure with AeroFly Airlines. Discover new destinations, create unforgettable memories, and experience the world like never before.
              </p>
              <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSearchFlight}>
                Book Now
              </button>
            </div>
          </div>
          <div className="destinations-field">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-2xl mb-4">Featured Destinations</h2>
              <div className="featured-destinations grid grid-cols-1 md:grid-cols-3 gap-4">
                {destinations.map((destination, index) => (
                  <div key={index} className="destination-card">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="destination-image w-full h-48 object-cover rounded-t-lg cursor-pointer"
                      onClick={() => handleImageClick(destination)}
                    />
                    <div className="destination-description p-4">
                      <h3 className="font-bold text-lg mb-2">{destination.title}</h3>
                      <p className="text-sm">{destination.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal" ref={modalRef}>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{modalContent.title}</h3>
                <button onClick={closeModal} className="close">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <img src={modalContent.image} alt={modalContent.title} />
                <p>{modalContent.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;