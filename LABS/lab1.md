## Лабораторна робота 1

 # [Button](./src/components/Buttom/Button.jsx)

 import styles from './Button.module.css';


const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;


# [Button CSS](./src/components/atoms/Button/Button.module.css)

.button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: opacity 0.3s;
}

.button:hover {
    opacity: 0.8;
}

.primary {
    background-color: #007bff;
    color: white;
}

.secondary {
    background-color: #6c757d;
    color: white;
}

# [Input](./src/components/atoms/Input/Input.jsx)

import styles from './Input.module.css';

const Input = ({ label, type = 'text', placeholder, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      {/* Якщо label передано, рендеримо тег label */}
      {label && <label className={styles.label}>{label}</label>}
      
      <input
        type={type}
        placeholder={placeholder}
        className={styles.inputField}
        {...props} 
      />
    </div>
  );
};

export default Input;

# [Input CSS](./src/components/atoms/Input/Input.module.css)

.inputWrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px; /* Відступи між блоками вводу */
  }
  
  .label {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
  }
  
  .inputField {
    padding: 10px;
    border: 1px solid #ccc; /* Рамка */
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
  }
  
  .inputField:focus {
    border-color: #007bff; /* Колір рамки при фокусі */
  }

# [Card](./src/components/molecules/Card/Card.jsx)

import styles from './Card.module.css';

/**
 * @param {ReactNode} children 
 */
const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;

# [Card CSS](./src/components/molecules/Card/Card.module.css)

.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 24px;
    max-width: 400px;
    margin: 20px auto;
    }

# [App](./src/App.jsx)

import Button from './components/atoms/Button/Button.jsx';
import Input from './components/atoms/Input/Input.jsx'; 
import Card from './components/molecules/Card/Card.jsx'; 
import Header from "./components/organisma/Header.jsx";

function App() {
  const handleLogin = () => {
    alert('Логіка входу буде реалізована пізніше');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f2f5' 
    }}>
      <Card>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
          Ласкаво просимо
        </h2>

        <div style={{ marginBottom: '15px' }}>
          <Input type="email" placeholder="Email" label="Електронна пошта" />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Input type="password" placeholder="Пароль" label="Ваш пароль" />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
}

export default App;

1. Що таке Atomic Design і навіщо ми розділяємо компоненти на атоми та
молекули?
2. Як працюють CSS Modules і як вони вирішують проблему глобальних імен
класів?
3. Що таке `props.children` і в якому компоненті цієї лабораторної роботи ми
його використали?
4. Чому атрибут HTML `class` у JSX записується як `className`?

1. Atomic Design — це підхід до побудови інтерфейсу, при якому компоненти розділяються на маленькі частини і поступово об’єднуються у більші. Найменші елементи називаються атомами (наприклад, кнопка або input). Кілька атомів разом утворюють молекули, наприклад поле пошуку з input і кнопкою. Таке розділення робить код більш зрозумілим, дозволяє повторно використовувати компоненти і спрощує підтримку та масштабування проєкту.

2. CSS Modules — це спосіб використання CSS, при якому стилі автоматично стають локальними для конкретного компонента. Коли ми імпортуємо файл стилів у компонент, кожен клас отримує унікальне ім’я під час збірки. Завдяки цьому класи не конфліктують між різними файлами і проблема глобальних імен класів зникає.

3. props.children — це спеціальна властивість у React, яка містить вміст, переданий всередину компонента між його тегами. Наприклад, якщо написати <Button>Натисни</Button>, то текст «Натисни» буде доступний у компоненті через props.children. Це дозволяє робити компоненти більш універсальними. У лабораторній роботі props.children використовувався у Button та Card.

4. У JSX атрибут class записується як className, тому що слово class є зарезервованим у JavaScript і використовується для створення класів. Оскільки JSX працює поверх JavaScript, замість class використовується className, який React потім перетворює у звичайний HTML-атрибут class.
