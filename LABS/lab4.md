# Лабораторна робота №4

## [Актуальне посилання на репозиторій з кодом.](https://github.com/ZhytomyrskaAnna/my-react-project)

## [2. Посилання на розгорнуту версію додатку (наприклад, на Vercel або GitHubPages)](https://zhytomyrskaanna.github.io/my-react-project/)

## 3. Текстовий опис реалізованої структури маршрутів із обґрунтуванням вибору вкладеності.

Архітектурний опис структури маршрутизації
В основі навігаційної логіки додатка лежить принцип декларативного групування маршрутів за допомогою бібліотеки react-router-dom. Структура побудована навколо центрального компонента-шаблону, що забезпечує цілісність інтерфейсу при переході між різними функціональними модулями.

1. Рівні вкладеності та компоненти
Батьківський рівень (Layout Layer): Маршрут з адресою / використовує компонент MainLayout. Він відіграє роль "майстер-сторінки", яка містить спільні елементи: заголовок (Header), бічну або верхню панель навігації (nav) та підвал (footer).

Контентний рівень (Outlet): Використання спеціального компонента <Outlet /> всередині MainLayout дозволяє динамічно підставляти дочірні компоненти залежно від URL. Це створює ієрархію, де зовнішня оболонка залишається стабільною, а змінюється лише внутрішній вміст.

Індексний маршрут: Для кореневого шляху визначено index element={<Home />}, що дозволяє відображати головну сторінку одразу при вході на сайт без додаткових сегментів у URL.

Динамічні параметри: Маршрут feed/:postId реалізує логіку "детального перегляду". Використання двокрапки вказує роутеру, що частина шляху є змінною, яку можна вилучити в дочірньому компоненті за допомогою хука useParams.

Гнучкі підмаршрути: Шлях profile/* із використанням символу "wildcard" дозволяє модулю профілю самостійно керувати своєю внутрішньою навігацією (наприклад, налаштуваннями або історією), не перевантажуючи головний конфігураційний файл App.jsx.

2. Обґрунтування вибору структури
Вибір саме такої вкладеності та організації коду базується на трьох ключових технічних перевагах:

Принцип DRY (Don't Repeat Yourself):
Замість дублювання коду меню навігації та футера на кожній із 10+ сторінок (практичні, лабораторні, стрічка), ці елементи описані один раз у MainLayout. Це значно спрощує підтримку: зміна одного посилання в меню автоматично відображається на всіх сторінках додатка.

Оптимізація продуктивності (Persistent Layout):
Завдяки вкладеним маршрутам, при переході, наприклад, з practice1 на lab1, React перемальовує лише вміст тегу <main>. Компоненти Header та nav не перемонтуються, що зберігає їхній стан, економить ресурси браузера та забезпечує плавний UX без візуальних стрибків.

Логічне групування та масштабованість:
Структура чітко розділяє навчальний контент (практичні та лабораторні роботи) і функціональний контент (стрічка новин, профіль). Додавання нових розділів потребує мінімальних змін: достатньо зареєструвати новий дочірній Route та додати відповідний NavLink.

Коректна обробка стану активності:
Використання компонента NavLink у поєднанні з функцією getActiveClass дозволяє системі автоматично порівнювати поточний URL із атрибутом to. Це дає користувачеві чіткий візуальний фідбек про те, в якому розділі він перебуває в конкретний момент.

Надійність (Error Handling):
Розміщення маршруту path="*" (NotFound) всередині MainLayout гарантує, що навіть при помилці в URL користувач не "випадає" з додатка. Він бачить повідомлення про помилку 404, але зберігає доступ до основного меню, що мінімізує ризик закриття сайту через втрату навігації.

## Фрагменти коду, що демонструють:

### [Конфігурацію Routes та BrowserRouter.](../src/App.jsx)
``` jsx
     <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element = {<Home />} />
          <Route path="feed" element ={<Feed />} />
          <Route path="/feed/:postId" element={<PostDetails />} />
          <Route path="practice1" element={<Practice1 />} />
          <Route path="practice2" element={<Practice2 />} />
          <Route path="practice3" element={<Practice3 />} />
          <Route path="practice4" element={<Practice4 />} />
          <Route path="lab1" element={<Lab1 />} />
          <Route path="lab2" element={<Lab2 />} />
          <Route path="lab3" element={<Lab3 />} />
          <Route path="lab4" element={<Lab4 />} />
          <Route path="profile/*" element ={<Profile />} />
          <Route path="*" element ={<NotFound />} />
        </Route>
      </Routes>
```

### [BrowserRouter](../src/main.jsx)
``` jsx
    <BrowserRouter>
      <App/>
    </BrowserRouter>
```

### [Реалізацію Layout із компонентом Outlet.](../src/components/templates/MainLayout/MainLayout.jsx)
``` jsx
    <div className={styles.wrapper}>
        <Header />
      <nav className={styles.navbar}>
        <NavLink to="/" className={getActiveClass} end>Головна</NavLink>
        <NavLink to="/feed" className={getActiveClass}>Стрічка</NavLink>
        <NavLink to="/practice1" className={getActiveClass}>Практична робота №1</NavLink>
        <NavLink to="/practice2" className={getActiveClass}>Практична робота №2</NavLink>
        <NavLink to="/practice3" className={getActiveClass}>Практична робота №3</NavLink>
        <NavLink to="/practice4" className={getActiveClass}>Практична робота №4</NavLink>
        <NavLink to="/lab1" className={getActiveClass}>Лабораторна робота №1</NavLink>
        <NavLink to="/lab2" className={getActiveClass}>Лабораторна робота №2</NavLink>
        <NavLink to="/lab3" className={getActiveClass}>Лабораторна робота №3</NavLink>
        <NavLink to="/lab4" className={getActiveClass}>Лабораторна робота №4</NavLink>
        <NavLink to="/profile" className={getActiveClass}>Профіль</NavLink>
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        Розроблено в рамках лабораторної роботи №4
      </footer>
    </div>
```

### [Логіку обробки параметрів через useParams.](../src/components/pages/Feed/PostDetails.jsx)
``` jsx
const { postId } = useParams();
  const navigate = useNavigate();


  const post = postsData.find((p) => p.id === parseInt(postId));

  if (!post) {
    return (
      <div className="section">
        <h2>Пост не знайдено</h2>
        <Button onClick={() => navigate('/feed')}>Повернутися до стрічки</Button>
      </div>
    );
  }

  return (
    <section className="section">
      <Button onClick={() => navigate(-1)} variant="secondary">
        ← Назад
      </Button>
      <div style={{ marginTop: '20px' }}>
        <Post {...post} />
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Повний текст публікації</h3>
          <p>{post.fullText || "Тут міг би бути дуже довгий текст вашого поста..."}</p>
        </div>
      </div>
    </section>
  );

```

### [Приклад програмної навігації через useNavigate.](../src/components/pages/Profile/Profile.jsx)
``` jsx
    const navigate = useNavigate();


  const handleLogout = () => {
    if (window.confirm("Ви впевнені, що хочете вийти?")) {
      navigate('/')
    }
  };

```

## Контрольні запитання

**1.У чому полягає фундаментальна різниця між клієнтською та серверною маршрутизацією?**

Серверна маршрутизація вимагає повного перезавантаженнясторінки та запиту нового HTML-документа при кожній зміні URL. Клієнтська
маршрутизація (SPA) маніпулює DOM деревом за допомогою JavaScript, змінюючи лише необхідні частини інтерфейсу без запиту всього документа.

**2. Яку роль відіграє атрибут index у компоненті Route?** 
Атрибут index вказує,що даний маршрут є типовим (default) для батьківського маршруту. Він відображається у батьківському Outlet, коли URL збігається точно зі шляхом батька.

**3. Чому для програмної навігації в обробниках подій варто використовувати useNavigate, а не Link?** 

Link є декларативним компонентом для створення клікабельних елементів у JSX. useNavigate повертає функцію, яку можна викликати всередині будь-якої логіки (наприклад, після завершення fetch-запиту або валідації форми), що забезпечує гнучкість управління потоком навігації.

**4. Як реалізувати динамічне підсвічування активних посилань у навігаційній панелі?** 

Для цього використовується компонент NavLink. Його властивості className та style можуть приймати функцію, яка отримує аргумент зі станом isActive, що дозволяє застосовувати специфічні CSS-класи автоматично.

**5. Що таке "catch-all" маршрут і де його слід розміщувати?** 

Це маршрут із шляхом *, який збігається з будь-яким URL. Його необхідно розміщувати останнім у списку Routes, щоб він спрацював лише тоді, коли жоден інший визначений шлях не підійшов.
