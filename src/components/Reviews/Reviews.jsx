import React from 'react';
import css from "./Reviews.module.css";
import star from "../../assets/pictures/icons/star.png";      
import greyStar from "../../assets/pictures/icons/greyStar.png";  

const Reviews = ({ camper }) => {

  const StarRating = ({ rating }) => {
    const totalStars = 5;

    return (
      <div className={css.stars}>
        {Array.from({ length: totalStars }, (_, index) => (
          <img
            key={index}
            src={index < rating ? star : greyStar}  
            alt={index < rating ? 'Filled Star' : 'Empty Star'}
            className={css.starIcon}  
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <hr className={css.grayLine}></hr>
    <div className={css.container}>
      {camper.reviews.map((review, index) => (
          <div key={index} className={css.reviewItem}>
              <div className={css.nameRating}>
                  <p className={css.letter}>{review.reviewer_name[0]}</p>
                  <div className={css.nameStars}>
          <p className={css.name}>{review.reviewer_name}</p>
          <StarRating rating={review.reviewer_rating} /> 
                  </div>
                  </div>
              <p className={css.comment}>{review.comment}</p>
        </div>
      ))}
      </div>
      </div>
  );
};

export default Reviews;
