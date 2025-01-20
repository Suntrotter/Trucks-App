import React, { useState, useEffect } from 'react';
import heart from '../../assets/pictures/icons/heart.png';
import redHeart from '../../assets/pictures/icons/redHeart.png';
import star from '../../assets/pictures/icons/star.png';
import map from '../../assets/pictures/icons/map.png';
import diagram from '../../assets/pictures/icons/diagram.png';
import petrol from '../../assets/pictures/icons/petrol.png';
import wind from '../../assets/pictures/icons/wind.png';
import cupHot from '../../assets/pictures/icons/cup-hot.png';
import css from "./CamperCard.module.css";
import { useNavigate } from 'react-router-dom';

const CamperCard = ({ camper }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(savedFavorites.includes(camper.id));
  }, [camper.id]);

  const handleFavoriteToggle = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = savedFavorites.filter(id => id !== camper.id);
    } else {
      updatedFavorites = [...savedFavorites, camper.id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite); 
  };

  const handleShowMore = () => {
    navigate(`/catalog/${camper.id}`); 
  };

  return (
    <div className={css.camperCard}>
      <img src={camper.gallery[0].thumb} alt={camper.name} className={css.camperImage} />
      <div className={css.camperInfo}>
        <div className={css.firstLine}>
          <h3>{camper.name}</h3>
          <div className={css.priceHeart}>
            <p className={css.price}>Price: € {camper.price.toLocaleString()},00</p>
            <img
              src={isFavorite ? redHeart : heart}
              alt="heart"
              className={css.heart}
              onClick={handleFavoriteToggle}
            />
          </div>
        </div>
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
        <p className={css.description}>{camper.description}</p>
        <div className={css.features}>
          {camper.transmission === "automatic" && (
            <div className={css.feature}>
              <img src={diagram} alt="Automatic Transmission" className={css.icon} />
              <p>Automatic</p>
            </div>
          )}
          {camper.gas === false && (
            <div className={css.feature}>
              <img src={petrol} alt="Petrol" className={css.icon} />
              <p>Petrol</p>
            </div>
          )}
          {camper.kitchen && (
            <div className={css.feature}>
              <img src={cupHot} alt="Kitchen" className={css.icon} />
              <p>Kitchen</p>
            </div>
          )}
          {camper.AC && (
            <div className={css.feature}>
              <img src={wind} alt="AC" className={css.icon} />
              <p>AC</p>
            </div>
          )}
        </div>
        <button className={css.btn} onClick={handleShowMore}>Show more</button>
      </div>
    </div>
  );
};

export default CamperCard;
