import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';
import styles from './CocktailCard.module.css';

const CocktailCard = ({ cocktail }) => {
  const { idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic } = cocktail;

  return (
    <Link to={`/lab6/${idDrink}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={`${strDrinkThumb}/medium`} 
          alt={strDrink} 
          loading="lazy"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{strDrink}</h3>
        <div className={styles.badges}>
          {strCategory && <Badge type="primary">{strCategory}</Badge>}
          {strAlcoholic && (
            <Badge type={strAlcoholic === 'Alcoholic' ? 'secondary' : 'success'}>
              {strAlcoholic}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CocktailCard;