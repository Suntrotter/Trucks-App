import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopDetailsSection from '../Pages/TopDetailsSection/TopDetailsSectionPage';
import css from '../Details/Details.module.css'; 
import Header from "../Header/Header";
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`)
      .then(response => {
        setCamper(response.data);
        setLoading(false);  
      })
      .catch(error => {
        console.error('Error fetching camper details:', error);
        setLoading(false);  
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className={css.details}>
        <TopDetailsSection id={id} camper={camper} />
        
      </div>
    </>
  );
};

export default Details;
