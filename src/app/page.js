"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css'; 
import cartoon from '../../public/cartoon-no-bg.png'
import Image from 'next/image'
import { messages } from './messages';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


export default function Home() {
  const [count, setCount] = useState(20);
  const [heartBoom, setHeartBoom] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);


  const handleHeartClick = () => {
    setCount(count * 2);
    setCurrentMessageIndex(() => {
      let randomIndex = Math.floor(Math.random() * messages.length) + 1;
      while (randomIndex === currentMessageIndex) {
        randomIndex = Math.floor(Math.random() * messages.length) + 1;
      }
      return randomIndex;
    }); 
  };

  useEffect(() => {
    if (count > 160) {
      setHeartBoom(true);

      const messageIndex = currentMessageIndex
      setCurrentMessageIndex(0);

      setTimeout(() => {
        setHeartBoom(false);
        setCount(20); 
        setCurrentMessageIndex(messageIndex+1)
      }, 1000);
    }
  }, [count]); 

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
      <h1 className={styles.fadeIn}>Oiii amor!!</h1>

        <span
          role="button"
          aria-label="heart"
          className={`${styles.heart} ${heartBoom ? styles.explode : ''}`}
          onClick={handleHeartClick}
          style={{ fontSize: `${count}px`}}
        >
          ❤️ 
        </span>

      <div className={styles.imageContainer}>
      <Image
            src={cartoon}
            width={200}
            height={200}
            alt="nos"
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
