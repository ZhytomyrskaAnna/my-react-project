import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCocktailDetailsById } from '../../../api/cocktailApi';
import Loader from '../../atoms/Loader/Loader';
import Badge from '../../atoms/Badge/Badge';
import Button from '../../atoms/Button/Button';
import styles from './CocktailDetail.module.css';

const CocktailDetail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await getCocktailDetailsById(id);
        if (data.drinks && data.drinks.length > 0) {
          setCocktail(data.drinks[0]);
        } else {
          setError('Коктейль не знайдено');
        }
      } catch (err) {
        setError('Помилка завантаження даних');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!cocktail) return null;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    
    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || '',
        imageUrl: `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredient)}-Small.png`
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
         <Link to="/lab6" className={styles.backLink}>
           <Button variant="secondary">← Назад до списку</Button>
         </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.imageColumn}>
          <img 
            src={`${cocktail.strDrinkThumb}/large`} 
            alt={cocktail.strDrink} 
            className={styles.mainImage}
          />
        </div>
        
        <div className={styles.infoColumn}>
          <h1 className={styles.title}>{cocktail.strDrink}</h1>
          
          <div className={styles.badges}>
            <Badge type="primary">{cocktail.strCategory}</Badge>
            <Badge type={cocktail.strAlcoholic === 'Alcoholic' ? 'secondary' : 'success'}>
              {cocktail.strAlcoholic}
            </Badge>
            <Badge type="default">{cocktail.strGlass}</Badge>
          </div>

          <div className={styles.section}>
            <h2>Instructions</h2>
            <p className={styles.instructions}>{cocktail.strInstructions}</p>
          </div>

          <div className={styles.section}>
            <h2>Ingredients</h2>
            <ul className={styles.ingredientList}>
              {ingredients.map((item, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <img src={item.imageUrl} alt={item.ingredient} className={styles.ingredientImg} />
                  <span className={styles.ingredientName}>{item.ingredient}</span>
                  {item.measure && <span className={styles.ingredientMeasure}>({item.measure.trim()})</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;