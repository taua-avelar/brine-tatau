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
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);


  const handleHeartClick = () => {
    let increment = 1; 
    const incrementAmount = fillLevel+20; 
    const intervalTime = 40;
  
    const interval = setInterval(() => {
      setFillLevel((prevFillLevel) => {
        const newFillLevel = prevFillLevel + increment;
        if (newFillLevel >= incrementAmount) {
          clearInterval(interval); 
          return incrementAmount;
        }
        return newFillLevel;
      });
    }, intervalTime);
    setCurrentMessageIndex(() => {
      let randomIndex = Math.floor(Math.random() * messages.length) + 1;
      while (randomIndex === currentMessageIndex) {
        randomIndex = Math.floor(Math.random() * messages.length) + 1;
      }
      return randomIndex;
    }); 
  };


  useEffect(() => {
    if (fillLevel >= 100) {
      setTimeout(() => {
        const messageIndex = currentMessageIndex
        setCurrentMessageIndex(0);
  
        setTimeout(() => {
          setFillLevel(0); 
          setCurrentMessageIndex(messageIndex+1)
        }, 1000);
      }, 1000)

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


  const gradientStyle = {
    backgroundImage: `linear-gradient(to top, red ${fillLevel}%, transparent ${fillLevel}%)`,
  };
  
  return (
  <main className={styles.main}>
    <header className={styles.header}>
      <div 
        className={styles.imageContainer}
        onClick={handleHeartClick}
        style={gradientStyle}

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
