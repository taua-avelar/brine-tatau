"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css'; 
import cartoon from '../../public/cartoon-no-bg.png'
import Image from 'next/image'
import { messages } from './messages';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'; // Adiciona esses imports


const firebaseConfig = {
  apiKey: "AIzaSyAJH6c2rqlVhXmilYLi6mgmpv-dwtkhK8U",
  authDomain: "brine-tatau-67edf.firebaseapp.com",
  projectId: "brine-tatau-67edf",
  storageBucket: "brine-tatau-67edf.appspot.com",
  messagingSenderId: "539936612586",
  appId: "1:539936612586:web:9423722d529d7768a9b793"
};

export default function Home() {
  const [fillLevel, setFillLevel] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

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
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    
    const fetchImageUrls = async () => {
      try {
        const storageRef = ref(storage); // Referência para o storage
        const listRef = await listAll(storageRef); // Lista todos os itens no storage

        const imageUrls = await Promise.all(
          listRef.items.map(async (item) => {
            const url = await getDownloadURL(item); // Obtém a URL de cada item
            return { name: item.name, url };
          })
        );

        setImageUrls(imageUrls);

      } catch (error) {
        console.error('Error fetching image URLs: ', error);
      }
    };

    fetchImageUrls();
  }, []);
  
  useEffect(() => {
    if (fillLevel >= 100) {
      setTimeout(() => {
        const messageIndex = currentMessageIndex
        setCurrentMessageIndex(0);
  
        setTimeout(() => {
          setFillLevel(0); 
          setCurrentMessageIndex(messageIndex+1)
        }, 1500);
      }, 1000)

    }
  }, [fillLevel]); 

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
      
      <Carousel
        showStatus={false}
        infiniteLoop
      >
      { imageUrls && imageUrls.map((img, i) => (
          <div key={img.name} className={styles.slider} style={{ marginBottom: '30px' }} >
                  <Image src={img.url} width={250} height={250} alt="nos" />
          </div>
        )) }
      </Carousel>


    </header>
  </main>
  );
}
