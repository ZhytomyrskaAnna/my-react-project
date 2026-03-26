import React from 'react';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import Card from '../../molecules/Card/Card';
import styles from './Lab1.module.css';

const Lab1 = () => {
  const handleLogin = () => {
    alert('Логіка входу буде реалізована пізніше');
  };

  return (
    <div className={styles.pageWrapper}>
      <Card>
        <h2 className={styles.title}>Ласкаво просимо</h2>
        
        <div className={styles.field}>
          <Input 
            label="Електронна пошта" 
            type="email" 
            placeholder="example@mail.com" 
          />
        </div>

        <div className={styles.field}>
          <Input 
            label="Пароль" 
            type="password" 
            placeholder="Введіть пароль" 
          />
        </div>

        <div className={styles.actions}>
          <Button onClick={handleLogin} variant="primary">
            Увійти
          </Button>
          <Button variant="secondary">
            Реєстрація
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Lab1;