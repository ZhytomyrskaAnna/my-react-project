# Практичне заняття №5 

# Звіт з практичної роботи №5
**Тема:** Побудова ієрархії компонентів. Декомпозиція складного макета.

## 1. Посилання
[* **GitHub-репозиторій**:](https://github.com/ZhytomyrskaAnna/my-react-project) 
[* **Розгорнута версія додатку (Vercel/GitHub Pages)**:]() 

---

## 2. Аналіз та Декомпозиція
В якості завдання для самостійного виконання було декомпозовано макет **"Картки товару інтернет-магазину"** (на прикладі Samsung Galaxy S25 Ultra).

### Ієрархія компонентів (3 рівні):

1. **Контейнерний (Smart) компонент:**
   - `ProductContainer`: Керує макетом всієї картки, отримує об'єкт товару (`product`) та керує станом кількості, який передається з батьківської сторінки.

2. **Презентаційні (Dumb) компоненти (Композиційний рівень):**
   - `ProductDetails`: Відповідає за відображення текстової інформації (назва, опис, ціна).
   - `ProductActions`: Об'єднує елементи керування (лічильник та кнопку покупки).

3. **Презентаційні (Dumb) компоненти (Атомарний рівень):**
   - `StarRating`: Візуальне відображення рейтингу (зірочки).
   - `Button`: Базові перевикористовувані UI-елементи.

### Джерело істини (Single Source of Truth)
Стан **"Кількості товару"** (`quantity`) зберігається на рівні сторінки `Practice5.jsx`. 
- **Логіка:** Стан піднято до найближчого спільного предка, щоб кнопка "Купити" та лічильник мали доступ до актуальних даних.
- **Передача:** Дані передаються вниз через **Props** у `ProductActions` разом із функцією оновлення (`setQuantity`).

---

## 3. Фрагменти коду

### `Practice5.jsx` (Ініціалізація стану)
```jsx
const Practice5 = () => {
  const [quantity, setQuantity] = useState(1);
  const productInfo = {
    name: "Samsung Galaxy S25 Ultra",
    price: 56999,
    image: "/path-to-img.jpg"
  };

  const handleBuy = () => {
    alert(`Додано до кошика: ${quantity} шт.`);
  };

  return (
    <ProductContainer
      product={productInfo}
      quantity={quantity}
      setQuantity={setQuantity}
      onBuy={handleBuy}
    />
  );
};
```
### `ProductContainer.jsx` (Композиція)
```jsx
const ProductContainer = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuyClick = () => {
    console.log(`Замовлення: ${product.name}, Кількість: ${quantity}`);
    alert(`Додано в кошик: ${quantity} шт.`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
      </div>
      
      <div className={styles.content}>
        <ProductDetails title={product.name} description={product.description} />
        <StarRating rating={product.rating} />
        <ProductActions 
          price={product.price} 
          quantity={quantity} 
          setQuantity={setQuantity}
          onBuy={handleBuyClick}
        />
      </div>
    </div>
  );
};
```

## `ProductActions.jsx` (Взаємодія зі станом через пропси)

```jsx
const ProductActions = ({ price, quantity, setQuantity, onBuy }) => {
  return (
    <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
      <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#007bff', marginBottom: '15px' }}>
        {price.toLocaleString()} ₴
      </div>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '8px' }}>
          <Button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ padding: '8px 15px', border: 'none', background: 'none', cursor: 'pointer' }}
          >-</Button>
          <span style={{ padding: '8px 10px', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
          <Button 
            onClick={() => setQuantity(quantity + 1)}
            style={{ padding: '8px 15px', border: 'none', background: 'none', cursor: 'pointer' }}
          >+</Button>
        </div>

        <Button 
          onClick={onBuy}
          style={{ 
            flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
            backgroundColor: '#007bff', color: 'white', fontWeight: '600', cursor: 'pointer'
          }}
        >
          Купити
        </Button>
      </div>
    </div>
  );
};
```

## 4. Контрольні запитання

1. **Які основні відмінності між презентаційним (Dumb) та контейнерним (Smart) компонентами у React?**
   - _Презентаційні_ відповідають за зовнішній вигляд (UI), отримують дані виключно через `props`, не мають побічних ефектів і, як правило, не мають власного стану (окрім дрібного UI-стану, наприклад відкриття дропдауну).
   - _Контейнерні_ (Smart) відповідають за логіку (як речі працюють). Вони викликають API, керують станом (`useState`, `useReducer`, Redux) і передають дані вниз до презентаційних компонентів.
2. **Поясніть принцип "Джерело істини" (Single Source of Truth) при побудові компонентної ієрархії. Де зазвичай має зберігатися спільний стан (State)?**
   Цей принцип означає, що певна частина даних повинна існувати лише в одному місці (одному стані). Якщо кілька компонентів потребують доступу до одних і тих самих даних, стан переноситься ("піднімається" — Lifting State Up) до їхнього найближчого спільного предка.
3. **Чому функція ітерації по масиву (`.map()`) зазвичай знаходиться на рівні проміжних композиційних компонентів (наприклад, `ActivityList`), а не всередині атомарних (наприклад, `ActivityItem`)?**
   Це забезпечує єдиноначальність та простоту атомарних компонентів. `ActivityItem` має відповідати лише за рендер _одного_ елемента — він не повинен знати про існування масиву. `ActivityList` є композитором, чия єдина відповідальність — пройтись по масиву і відрендерити потрібну кількість `ActivityItem`.
4. **Що таке явище Prop Drilling і коли воно стає проблемою при глибокій ієрархії компонентів?**
   Prop Drilling — це процес передачі пропсів вниз по дереву компонентів через проміжні рівні, які самі не використовують ці дані, а лише передають їх далі. Це стає проблемою, коли ієрархія дуже глибока: код стає важко читати, рефакторити і підтримувати, оскільки зміна одного пропса вимагає редагування багатьох проміжних файлів.
5. **Наведіть критерії, спираючись на які ви приймаєте рішення винести окремий шматок JSX-розмітки у новий незалежний файл компонента.**
   - **Перевикористання:** Якщо шматок UI зустрічається більше одного разу (кнопка, інпут, картка).
   - **Складність/Розмір:** Якщо компонент стає занадто довгим (наприклад, більше 100-150 рядків) і в ньому важко орієнтуватися.
   - **Єдина відповідальність (Single Responsibility):** Якщо частина розмітки виконує логічно відокремлену роль (наприклад, відмальовує складний графік всередині великого дашборду).
   - **Оптимізація рендеру:** Якщо частина UI часто оновлюється, її варто винести в окремий компонент і обгорнути в `React.memo`, щоб не рендерити всю сторінку.
