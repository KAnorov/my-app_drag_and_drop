"use client"
import { useState } from 'react';
import styles from '@/app/page.module.css';

type BasketId = 'basket1' | 'basket2' | 'basket3';

export default function Home() {
  const [currentBasket, setCurrentBasket] = useState<BasketId>('basket1');
  const handleDrop = (basketId: BasketId) => {
    setCurrentBasket(basketId);
  };

  return (
    <div className={styles.container}>
      <Basket 
        id="basket1" 
        onDrop={handleDrop} 
        hasBall={currentBasket === 'basket1'}
      />
      <Basket 
        id="basket2" 
        onDrop={handleDrop} 
        hasBall={currentBasket === 'basket2'}
      />
      <Basket 
        id="basket3" 
        onDrop={handleDrop} 
        hasBall={currentBasket === 'basket3'}
      />
    </div>
  );
}

function Basket({ id, onDrop, hasBall }: { 
  id: BasketId; 
  onDrop: (id: BasketId) => void;
  hasBall: boolean;
}) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(id);
  };

  return (
    <div 
      className={styles.basket}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {hasBall && <Ball />}
    </div>
  );
}

function Ball() {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'ball');
  };

  return (
    <div 
      className={styles.ball}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={(e) => e.preventDefault()}
    />
  );
}