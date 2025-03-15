import { useState } from 'react';
import styles from '@/components/DragAndDrop/DragAndDrop.module.css';

type BasketId = 'basket1' | 'basket2' | 'basket3';

export default function DragAndDrop() {
  const [currentBasket, setCurrentBasket] = useState<BasketId>('basket1');
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (basketId: BasketId) => {
    setCurrentBasket(basketId);
  };

  return <>
    <div className={styles.container}>
      <Basket 
        id="basket1" 
        onDrop={handleDrop} 
        hasBall={currentBasket === 'basket1'}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
      <Basket 
        id="basket2" 
        onDrop={handleDrop} 
        hasBall={currentBasket === 'basket2'}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
      <Basket 
        id="basket3" 
        onDrop={handleDrop} 
        hasBall={currentBasket === 'basket3'}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
    </div>
    </>;
}

function Basket({ id, onDrop, hasBall, isDragging, setIsDragging }: { 
  id: BasketId; 
  onDrop: (id: BasketId) => void;
  hasBall: boolean;
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(id);
  };

  return (
    <div 
      className={`${styles.basket} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {hasBall && <Ball setIsDragging={setIsDragging} />}
      {!hasBall && isDragging && (
        <div className={styles.placeholder}>Drop here</div>
      )}
    </div>
  );
}

function Ball({ setIsDragging }: { 
  setIsDragging: (value: boolean) => void 
}) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'ball');
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return <>
  
    <div 
      className={styles.ball}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
 </>;
}

