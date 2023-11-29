"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css'; 
import cartoon from '../../public/cartoon-no-bg.png'
import Image from 'next/image'
import { messages } from './messages';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


export default function Home() {
  const [fillLevel, setFillLevel] = useState(0);
  const [heartBoom, setHeartBoom] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);


  const handleHeartClick = () => {
    setFillLevel(fillLevel + 20);
    setCurrentMessageIndex(() => {
      let randomIndex = Math.floor(Math.random() * messages.length) + 1;
      while (randomIndex === currentMessageIndex) {
        randomIndex = Math.floor(Math.random() * messages.length) + 1;
      }
      return randomIndex;
    }); 
  };

  const gradientStyle = {
    backgroundImage: `linear-gradient(to top, red ${fillLevel}%, transparent ${fillLevel}%)`,
  };

  useEffect(() => {
    if (fillLevel >= 100) {
      setHeartBoom(true);
      setFillLevel(0); 

      const messageIndex = currentMessageIndex
      setCurrentMessageIndex(0);

      setTimeout(() => {
        setHeartBoom(false);
        setCurrentMessageIndex(messageIndex+1)
      }, 1000);
    }
  }, [fillLevel]); 

  const [sliderRef] = useKeenSlider({
    mode: "free",
    slides: {
      origin: "center",
      perView: 2,
      spacing: 15,
    },
  })
  
  return (
  <main className={styles.main}>
    <header className={styles.header}>
      <div 
        className={styles.imageContainer}
        onClick={handleHeartClick}
      >
      <Image
            src={cartoon}
            width={200}
            height={200}
            alt="nos"
            className={styles.image}
          />
      </div>
      <p key={currentMessageIndex} className={styles.message}>{messages[currentMessageIndex]}</p>


      <div style={{ marginTop: '100px' }}>
        <p>Em breve...</p>
      </div>

      <div ref={sliderRef} className="keen-slider" style={{ marginTop: '50px', maxWidth: '100vw' }}>
        <div className="keen-slider__slide number-slide1">fotos</div>
        <div className="keen-slider__slide number-slide2">fotos</div>
        <div className="keen-slider__slide number-slide3">fotos</div>
        <div className="keen-slider__slide number-slide4">fotos</div>
        <div className="keen-slider__slide number-slide5">fotos</div>
        <div className="keen-slider__slide number-slide6">fotos</div>
      </div>

      
    </header>
  </main>
  );
}
