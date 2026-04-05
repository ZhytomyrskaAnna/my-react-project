# Лабораторна робота 6

## [Посилання на оновлений розгорнутий тестовий стенд (Vercel або GitHub Pages)](https://zhytomyrskaanna.github.io/lab6/11021)

## [API взаємодія](../src/api/cocktailApi.js)
``` js
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const searchCocktailByName = async (name) => {
  const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const listCocktailsByLetter = async (letter) => {
  const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const getCocktailDetailsById = async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// ... інші методи фільтрації
```

##  [Кастомний хук useFetch.jsx](../src/hooks/useFetch.js)

``` js
import { useState, useCallback } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performFetch = useCallback(async (apiCallFunc) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCallFunc();
      setData(result);
    } catch (err) {
      setError(err.message || "Сталася помилка");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, performFetch };
};
```

## [Компонент, що реалізує життєвий цикл запиту списку (Стрічка новин з відображенням isLoading та списку елементів)](../src/components/pages/Lab6/Lab6.jsx)

``` jsx
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
```


## Контрольні запитання

**1.Поясніть призначення об'єкта AbortController у нашому хуку useFetch. Яку загрозу для React-додатку він усуває?**

Об'єкт AbortController дозволяє примусово скасувати мережевий запит, якщо компонент був розмонтований (unmounted) до того, як прийшла відповідь від сервера. Він усуває загрозу витоку пам'яті та помилок у консолі, коли асинхронна операція намагається оновити стан компонента, якого вже не існує в DOM.

**2.Що таке патерн "Тріада станів" (loading, error, data) при роботі з мережею і чому він є обов'язковим для якісного UX?**

Ця тріада є стандартом обробки асинхронних операцій, де loading відповідає за індикацію очікування, error — за сповіщення про проблеми, а data — за відображення результату. Це обов'язково для якісного UX, оскільки користувач завжди повинен розуміти поточний статус процесу, замість того щоб бачити порожній екран або стикатися з непередбачуваною поведінкою інтерфейсу.

**3.Чому функція виконання мережевого запиту (fetch або axios.get) розміщується всередині хука useEffect, а не прямо в тілі функціонального компонента?**

Запити розміщують у useEffect, тому що вони є "побічними ефектами" (side effects), які не повинні блокувати чисте рендерення компонента. Якщо викликати fetch прямо в тілі функції, запит буде виконуватися при кожному повторному рендері (наприклад, при будь-якій зміні стану), що призведе до нескінченного циклу запитів та перевантаження сервера.

**4.У чому полягають головні переваги використання бібліотеки axios у порівнянні з нативним fetch (якщо студенти використовували її під час самостійної розробки)?**

Axios автоматично перетворює відповідь у формат JSON (у fetch треба викликати .json()), має вбудовану підтримку перехоплювачів (interceptors) для обробки токенів та глобальних помилок, а також автоматично генерує помилку для всіх статусів поза межами 2xx. Крім того, він має простіший синтаксис для роботи з тайм-аутами та легше інтегрується з застарілими браузерами.

**5.Опишіть потенційні ризики багу "Стан гонитви" (Race Condition), якщо користувач буде дуже швидко перемикати сторінки з різними URL-параметрами, за якими робляться запити.**

Race Condition виникає, коли кілька запитів виконуються одночасно, і відповідь від старого запиту приходить пізніше, ніж від нового, перезаписуючи актуальні дані застарілими. Це створює ризик відображення некоректної інформації: наприклад, користувач перейшов на сторінку коктейлю "Маргарита", але через затримку мережі раптом побачив дані попереднього коктейлю "Мохіто".
