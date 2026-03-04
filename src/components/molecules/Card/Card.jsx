import styles from './Card.module.css';

/**
 * @param {ReactNode} children 
 */
const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;