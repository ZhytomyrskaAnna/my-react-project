import React from 'react';

const ProductDetails = ({ title, description }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>{title}</h2>
    <p style={{ color: '#555', lineHeight: '1.5', fontSize: '0.95rem' }}>{description}</p>
  </div>
);

export default ProductDetails;