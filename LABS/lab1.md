## Лабораторна робота 1
 
 ./components/Buttom/Button.jsx

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

./components/Buttom/Button.module.css
