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
import { useFetch } from "../../../hooks/useFetch";
import CocktailCard from '../../molecules/CocktailCard/CocktailCard';
import FilterBar from '../../molecules/FilterBar/FilterBar';
import CocktailCardSkeleton from '..//../molecules/CocktailCardSkeleton/CocktailCardSkeleton';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import styles from './Lab6.module.css';

const Lab6 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading:loading, error, performFetch } = useFetch();
  
  const cocktails = data?.drinks || [];

  useEffect(() => {
    performFetch(() => listCocktailsByLetter('a'));
  }, [performFetch]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    performFetch(() => searchCocktailByName(searchQuery));
  };

  const handleFilterChange = (type, value) => {
    if (!value) return performFetch(() => listCocktailsByLetter('a'));

    const apiMethods = {
      'c': filterByCategory,
      'a': filterByAlcoholic,
      'g': filterByGlass,
      'i': filterByIngredient
    };

    performFetch(() => apiMethods[type](value));
  };

  const getRandom = () => performFetch(getRandomCocktail);

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