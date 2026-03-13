# Лабораторна робота 3

## [Посилання на останній коміт](https://github.com/ZhytomyrskaAnna/my-react-project/commit/edfb945a5bfacd44334ed12e5eab01e7c95b51f9)

## [Посилання на розгорнуту версію (GitHub Pages/Vercel).](https://github.com/ZhytomyrskaAnna/my-react-project/actions/runs/23046415955)

## [Фрагмент коду з логікою роботи пошуку]()
```jsx

const [searchTerm, setSearchTerm] = useState("");

const matchesSearch =
  post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
  post.author.toLowerCase().includes(searchTerm.toLowerCase());
```

Цей код реалізує пошук постів за вмістом (content) або автором (author).
Метод includes() перевіряє, чи містить текст введений користувачем рядок.
Метод toLowerCase() використовується для пошуку без урахування регістру.

## [Фрагмент коду з логікою фільтрації]()
```jsx
const [activeCategory, setActiveCategory] = useState("All");

const filteredPosts = postsData.filter((post) => {
  const matchesSearch =
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    activeCategory === "All" || post.category === activeCategory;

  return matchesSearch && matchesCategory;
});
```

Фільтрація виконується за допомогою методу filter().
Пост буде показаний у стрічці лише тоді, коли:

- він відповідає пошуковому запиту

- він відповідає обраній категорії

## Пояснення, як реалізовано обробку "порожнього результату".

```jsx
<div className={styles.feed}>
  {filteredPosts.length > 0 ? (
    filteredPosts.map((post) => <Post key={post.id} {...post} />)
  ) : (
    <p className={styles.empty}>Нічого не знайдено за вашим запитом.</p>
  )}
</div>
```

Ми перевіряємо довжину масиву filteredPosts.
Якщо масив порожній (length === 0), відображається повідомлення Empty State.

## Контрольні запитання

**1. Що таке "підняття стану" (lifting state up) і чому ми використовуємо його для `SearchBar`?**

Підняття стану — це перенесення стану з дочірнього компонента до батьківського.
У нашому випадку стан пошуку (searchTerm) зберігається у компоненті App, а компонент SearchBar лише передає введені дані через onSearchChange.
Це дозволяє:
- використовувати значення пошуку в інших компонентах
- централізовано керувати логікою фільтрації
- уникнути дублювання стану.

**2. Поясніть асинхронну природу оновлення стану в `useState`.**

Оновлення стану в React є асинхронним, тому після виклику setState нове значення не змінюється миттєво.

Наприклад:
```jsx
setSearchTerm("React");
console.log(searchTerm);
```
console.log може показати старе значення, оскільки React об'єднує оновлення стану та виконує їх під час наступного рендеру.
Це робиться для оптимізації продуктивності.

**3. Чому для фільтрації ми створюємо нову змінну `filteredPosts`, а не змінюємо
оригінальний масив `postsData` у стані?**

У React не рекомендується змінювати оригінальні дані (mutations).
Причини:
- React працює краще з незмінними даними (immutable data)
- це дозволяє уникнути побічних ефектів
- простіше відстежувати зміни стану
- зберігається оригінальний список постів
Тому ми створюємо новий масив filteredPosts.

**4. У чому перевага використання керованих компонентів над некерованими
при реалізації пошуку?**

Керований компонент — це компонент, у якому значення форми контролюється станом React.
Переваги:
- React повністю контролює значення поля вводу
- легше реалізувати пошук у реальному часі
- простіше виконувати валідацію
- легше синхронізувати дані між компонентами
У нашому випадку значення поля пошуку зберігається у стані searchTerm.
