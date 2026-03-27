import React, { useState } from 'react';
import StarRating from './StarRating';
import ProductDetails from './ProductDetails';
import ProductActions from './ProductActions';
import styles from './ProductCard.module.css'; // Ваш файл зі скриншоту

const ProductContainer = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuyClick = () => {
    console.log(`Замовлення: ${product.name}, Кількість: ${quantity}`);
    alert(`Додано в кошик: ${quantity} шт.`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
      </div>
      
      <div className={styles.content}>
        <ProductDetails title={product.name} description={product.description} />
        <StarRating rating={product.rating} />
        <ProductActions 
          price={product.price} 
          quantity={quantity} 
          setQuantity={setQuantity}
          onBuy={handleBuyClick}
        />
      </div>
    </div>
  );
};

export default ProductContainer;