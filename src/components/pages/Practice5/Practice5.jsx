import React from 'react';
import ProductContainer from '../../organisma/ProductContainer/ProductContainer.jsx';

const Practice5 = () => {
  const mockProduct = {
    name: "Samsung Galaxy S25 Ultra 12/256GB",
    description: "Новий флагман з титановим корпусом та інтелектуальною камерою 200 МП. Найпотужніший процесор для геймінгу та роботи.",
    price: 56999,
    rating: 4.9,
    imageUrl: "https://via.placeholder.com/300x300?text=S25+Ultra"
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Практична робота №5</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        <ProductContainer product={mockProduct} />
      </div>
    </div>
  );
};

export default Practice5;
