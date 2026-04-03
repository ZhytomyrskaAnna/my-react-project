import { useEffect, useState } from 'react';
import { 
  getCategoriesList, 
  getGlassesList, 
  getIngredientsList, 
  getAlcoholicList 
} from '../../../api/cocktailApi';
import styles from './FilterBar.module.css';

const FilterBar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [alcoholics, setAlcoholics] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catData, glassData, ingData, alcData] = await Promise.all([
          getCategoriesList(),
          getGlassesList(),
          getIngredientsList(),
          getAlcoholicList()
        ]);
        
        setCategories(catData.drinks || []);
        setGlasses(glassData.drinks || []);
        setIngredients(ingData.drinks || []);
        setAlcoholics(alcData.drinks || []);
      } catch (err) {
        console.error("Failed to load filters", err);
      }
    };
    
    fetchFilters();
  }, []);

  const handleChange = (type, value) => {
    onFilterChange(type, value);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label htmlFor="category" className={styles.label}>Категорія</label>
        <select 
          id="category" 
          className={styles.select}
          onChange={(e) => handleChange('c', e.target.value)}
        >
          <option value="">Всі</option>
          {categories.map((c, i) => (
            <option key={i} value={c.strCategory}>{c.strCategory}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="alcoholic" className={styles.label}>Тип</label>
        <select 
          id="alcoholic" 
          className={styles.select}
          onChange={(e) => handleChange('a', e.target.value)}
        >
          <option value="">Всі</option>
          {alcoholics.map((a, i) => (
            <option key={i} value={a.strAlcoholic}>{a.strAlcoholic}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="glass" className={styles.label}>Келих</label>
        <select 
          id="glass" 
          className={styles.select}
          onChange={(e) => handleChange('g', e.target.value)}
        >
          <option value="">Всі</option>
          {glasses.map((g, i) => (
            <option key={i} value={g.strGlass}>{g.strGlass}</option>
          ))}
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <label htmlFor="ingredient" className={styles.label}>Інгредієнт</label>
        <select 
          id="ingredient" 
          className={styles.select}
          onChange={(e) => handleChange('i', e.target.value)}
        >
          <option value="">Всі</option>
          {ingredients.slice(0, 100).map((ing, i) => ( // limit to 100 for better UI
            <option key={i} value={ing.strIngredient1}>{ing.strIngredient1}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;