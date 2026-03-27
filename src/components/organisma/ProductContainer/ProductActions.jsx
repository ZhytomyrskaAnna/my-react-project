import React from 'react';

const ProductActions = ({ price, quantity, setQuantity, onBuy }) => {
  return (
    <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
      <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#007bff', marginBottom: '15px' }}>
        {price.toLocaleString()} ₴
      </div>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '8px' }}>
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ padding: '8px 15px', border: 'none', background: 'none', cursor: 'pointer' }}
          >-</button>
          <span style={{ padding: '8px 10px', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            style={{ padding: '8px 15px', border: 'none', background: 'none', cursor: 'pointer' }}
          >+</button>
        </div>

        <button 
          onClick={onBuy}
          style={{ 
            flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
            backgroundColor: '#007bff', color: 'white', fontWeight: '600', cursor: 'pointer'
          }}
        >
          Купити
        </button>
      </div>
    </div>
  );
};

export default ProductActions;