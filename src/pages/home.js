import './home.css';
import image from '../images/25251927_7083598.jpg';
import React from 'react';

const Home = () => {
  return (
    <section className='hero_wrapper'>
      <div className='paddings innerWidth flexCenter home_container'>
        <div className='home-left'>
          <div className='title'>
            <h1>Personalized <br/> Tutor</h1>
          </div>
          <div className='description'>
            <span>Find tutors tailored to your needs with our diverse selection. Whether it academics, languages, or specialized skills, our platform matches you with the perfect tutor for effective learning outcomes.</span>
          </div>
          <div className="flexCenter search-bar">
            <input type="text" placeholder="Enter Email"/>
            <button className="button">Search</button>
          </div>
        </div>
        <div className='flexCenter home-right'>
          <div className='image_container'>
            <img src={image} alt='Personalized Tutor' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
