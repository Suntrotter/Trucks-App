import React from 'react';
import css from "./HomePage.module.css"
import { Link } from 'react-router-dom';
import Header from "../../Header/Header"

const HomePage = () => {
    return (
      <div>
        <Header />
        <div>
          <main className={css.hero}>
            <h1>Campers of your dreams</h1>
            <h2>You can find everything you want in our catalog</h2>
            <Link to="/catalog">
        <button>View Now</button> 
      </Link>
          </main>
        </div>
        </div>
    );
};

export default HomePage;


    