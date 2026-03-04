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