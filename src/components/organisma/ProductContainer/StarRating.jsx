import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '10px 0' }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < Math.floor(rating) ? '#FFD700' : '#E0E0E0', fontSize: '20px' }}>
          ★
        </span>
      ))}
      <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>{rating}</span>
    </div>
  );
};

export default StarRating;