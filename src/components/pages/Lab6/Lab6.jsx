import { useState, useEffect } from 'react';
import { 
  searchCocktailByName, 
  listCocktailsByLetter,
  filterByCategory,
  filterByAlcoholic,
  filterByGlass,
  filterByIngredient,
  getRandomCocktail
} from '../../../api/cocktailApi';
import CocktailCard from '../../moleculas/CocktailCard';
import FilterBar from '../../moleculas/FilterBar';
import CocktailCardSkeleton from '../../moleculas/CocktailCardSkeleton';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import styles from './Lab6.module.css';

const Lab6 = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    fetchCocktailsByLetter('a');
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await searchCocktailByName(searchQuery);
      setCocktails(data.drinks || []);
      if (!data.drinks) setError('Коктейлів не знайдено');
    } catch (err) {
      setError('Помилка завантаження даних');
    } finally {
      setLoading(false);
    }
  };

  const fetchCocktailsByLetter = async (letter) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listCocktailsByLetter(letter);
      setCocktails(data.drinks || []);
      if (!data.drinks) setError('Немає коктейлів на цю літеру');
    } catch (err) {
      setError('Помилка завантаження даних');
    } finally {
      setLoading(false);
    }
  };

  const getRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRandomCocktail();
      setCocktails(data.drinks || []);
    } catch (err) {
      setError('Помилка завантаження даних');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (type, value) => {
    if (!value) {
      fetchCocktailsByLetter('a'); // Reset to default
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let data;
      switch (type) {
        case 'c': data = await filterByCategory(value); break;
        case 'a': data = await filterByAlcoholic(value); break;
        case 'g': data = await filterByGlass(value); break;
        case 'i': data = await filterByIngredient(value); break;
        default: break;
      }
      setCocktails(data?.drinks || []);
      if (!data?.drinks) setError('Нічого не знайдено за цим фільтром');
    } catch (err) {
      setError('Помилка завантаження даних');
    } finally {
      setLoading(false);
    }
  };

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cocktail Explorer</h1>
        <p className={styles.subtitle}>Досліджуйте світ коктейлів за допомогою TheCocktailDB API</p>
      </div>

      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Input 
            type="text"
            placeholder="Пошук коктейлю за назвою..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Знайти</Button>
        </form>
        <Button onClick={getRandom} variant="secondary">Випадковий коктейль</Button>
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      <div className={styles.alphabet}>
        {alphabet.map((letter) => (
          <button 
            key={letter} 
            className={styles.letterBtn}
            onClick={() => fetchCocktailsByLetter(letter)}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <CocktailCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.grid}>
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lab6;