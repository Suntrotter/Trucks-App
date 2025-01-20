import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from './/TopDetailsSectionPage.module.css';
import star from '../../../assets/pictures/icons/star.png';
import map from '../../../assets/pictures/icons/map.png';
import lineFeatures from '../../../assets/pictures/icons/lineFeatures.png';
import lineReviews from '../../../assets/pictures/icons/lineReviews.png';
import Features from '../../Features/Features'; 
import Reviews from '../../Reviews/Reviews'; 
import Form from '../../Form/Form'; 

const TopSection = ({ id }) => {
  const [camper, setCamper] = useState(null);
  const [activeTab, setActiveTab] = useState('features'); // Track active tab
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    setLoading(true);  // Set loading to true when the request starts
    setError(null);    // Clear any previous errors

    axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`)
      .then(response => {
        setCamper(response.data);
        setLoading(false);  // Set loading to false once the data is fetched
      })
      .catch(error => {
        setError('Failed to load camper data');  // Set error message if request fails
        setLoading(false);  // Set loading to false even if there is an error
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>;  // Show error message
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={css.topSection}>
      <h1>{camper.name}</h1>
      <div className={css.secondLine}>
        <div className={css.starRating}>
          <img src={star} alt="star" className={css.star} />
          <p className={css.rating}>{camper.rating} ({camper.reviews.length} Reviews)</p>
        </div>
        <div className={css.mapLocation}>
          <img src={map} alt="map" className={css.map} />
          <p>{camper.location}</p>
        </div>
      </div>
      <p className={css.price}>Price: € {camper.price.toLocaleString()},00</p>

      <div className={css.gallery}>
        <img src={camper.gallery[0].thumb} alt={camper.name} className={css.camperImage} />
        <img src={camper.gallery[1].thumb} alt={camper.name} className={css.camperImage} />
        <img src={camper.gallery[2].thumb} alt={camper.name} className={css.camperImage} />
        <img src={camper.gallery[0].thumb} alt={camper.name} className={css.camperImage} />
      </div>

      <p className={css.description}>{camper.description}</p>
      
      <div className={css.tabs}>
        <p 
          onClick={() => handleTabClick('features')} 
          className={activeTab === 'features' ? css.activeTab : ''} // Apply active class for underline
        >
          Features
        </p>
        
        <img 
          src={lineFeatures} 
          alt="red line" 
          className={activeTab === 'features' ? css.lineFeaturesActive : css.lineFeatures} 
        />

        <p 
          onClick={() => handleTabClick('reviews')} 
          className={activeTab === 'reviews' ? css.activeTab : ''} // Apply active class for underline
        >
          Reviews
        </p>

        <img 
          src={lineReviews} 
          alt="red line" 
          className={activeTab === 'reviews' ? css.lineReviewsActive : css.lineReviews} 
        />
        
      </div>

      <div className={css.flexContainer}>
        <div className={css.tabContent}>
          {activeTab === 'features' ? <Features camper={camper} /> : <Reviews camper={camper} />}
        </div>
        <div className={css.formWrapper}>
          <Form />
        </div>
      </div>

    </div>
  );
};

export default TopSection;
