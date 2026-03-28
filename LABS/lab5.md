# Лабораторна робота №5

## 1. [Посилання на розгорнуту версію додатку (Vercel або GitHub Pages)](https://zhytomyrskaanna.github.io/my-react-project/)

## 2. Конфігурацію `AuthContext.jsx`
```jsx
    import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```
## 3. Реалізацію компонента `ProtectedRoute.jsx`
```jsx
    import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
```

## 4. Контрольні запитання

**1. Яку архітектурну проблему (пов'язану з передачею пропсів) вирішує використання Context API?**

Context API вирішує проблему Prop Drilling — ситуацію, коли дані (наприклад, статус авторизації) потрібно передати глибоко вкладеному компоненту через багато проміжних рівнів, які ці дані не використовують. Замість того, щоб "прокидати" пропси вручну крізь кожне дерево компонентів, Context дозволяє будь-якому компоненту-споживачу отримати доступ до даних напряму з глобального сховища.
  
**2. Чому для глобального управління станом у складних додатках іноді обирають Redux/Zustand замість вбудованого Context API?**

У складних додатках обирають сторонні бібліотеки (Zustand, Redux) через кращу продуктивність та інструментарій. Context API при зміні значення спричиняє перерендер усіх компонентів, які його використовують, що може сповільнювати інтерфейс. Спеціалізовані бібліотеки дозволяють підписуватися лише на окремі частини стану, пропонують зручну відладку (DevTools) та краще підходять для складної бізнес-логіки.
   
**3. Яка роль патерна Higher-Order Component (HOC) при реалізації захищених маршрутів (Protected Routes)?**

Патерн Higher-Order Component (HOC) виступає в ролі "обгортки-фільтра", яка додає логіку перевірки доступу до звичайних компонентів сторінок. Його роль — відокремити перевірку прав користувача від вмісту самої сторінки: якщо користувач авторизований, HOC рендерить цільовий контент, якщо ні — виконує перенаправлення, що дозволяє уникнути дублювання коду перевірки на кожній приватній сторінці.
   
**4. Чому при перенаправленні неавторизованого користувача використовується властивість `replace: true` у компоненті `Navigate`? (Поясніть вплив на стек історії браузера).**
   
Властивість replace: true замінює поточний запис у стеку історії браузера новим (сторінкою входу) замість додавання наступного. Це критично важливо для UX: якщо не використовувати replace, користувач після редиректу натисне кнопку "Назад" і знову потрапить на захищену сторінку, яка миттєво відкине його назад на "Login". Використання replace розриває це замкнене коло, видаляючи "заборонену" адресу з історії переходів.