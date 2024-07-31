import React from 'react';
import styles from "./Hero.module.css";
import orange from "./images/orangetraingle.png";
import blue from "./images/blue.png";
import herochart from "./images/herochart.png";
import team1 from "./images/team1.png";
import team2 from "./images/team2.png";
import team3 from "./images/team3.png";
import team4 from "./images/team4.png";
import team5 from "./images/team5.png";
import team6 from "./images/team6.png";
import team7 from "./images/team7.png";
import team8 from "./images/team8.png";
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Explore from '../explore/Explore';
import Result from '../result/Result';
import Features from '../features/Features';
import Conversion from '../conversion/Conversion';
import Integrate from '../integrate/Integrate';


const heroCompany = [
  { id: 1, img: team1 },
  { id: 2, img: team2 },
  { id: 3, img: team3 },
  { id: 4, img: team4 },
  { id: 5, img: team5 },
  { id: 6, img: team6 },
  { id: 7, img: team7 },
  { id: 8, img: team8 }
];

function Hero() {
  const navigate = useNavigate()

  return (
    <div className={styles.heroContainer}>
    <div className={styles.heroTitle}>
      <img src={orange} alt="Orange Triangle" className={styles.heroImage} />
      <div className={styles.heroDesc}>
        <div className={`${styles.heroHeading} outfit`}>Build advanced chatbots visually</div>
        <div className={`${styles.heroSubheading} open-sans`}>
          Typebot gives you powerful blocks to create unique chat experiences. Embed them
          anywhere on your web/mobile apps and start collecting results like magic.
        </div>
        <button onClick={() => navigate("/register")} className={`${styles.heroSignup} open-sans`}>
          Create a FormBot for free
        </button>
      </div>
      <img src={blue} alt="Blue" className={styles.heroImage} />
    </div>

    <div className={styles.heroChart}>
      <img src={herochart} alt="Hero Chart" />
    </div>
      <Explore />
      <Integrate />
      <Result />
      <Features/>
      <div className={`${styles.heroCompanyText} outfit`}>
        Loved by teams and creators from all around the world
      </div>
      <div className={styles.heroCompany}>
        {heroCompany.map((item) => (
          <img key={item.id} src={item.img} alt={`Team ${item.id}`} className={styles.companyImage} />
        ))}
      </div>
      <Conversion />
      <Footer />
    </div>
  );
}

export default Hero;