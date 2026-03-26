import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button/Button.jsx';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 — Сторінку не знайдено</h1>
      <p>Ой! Схоже, ви заблукали. Такої адреси не існує.</p>
      <Button onClick={() => navigate('/feed')}>
        Повернутися на головну
      </Button>
    </section>
  );
};

export default NotFound;