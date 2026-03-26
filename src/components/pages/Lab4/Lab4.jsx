import React from 'react';
import './Lab4.module.css';

const Lab4 = () => {
  return (
    <section className="lab-section">
      <h2 className="lab-title">Лабораторна 4: Маршрутизація (react-router-dom)</h2>
      
      <div className="lab-card">
        <p className="lab-description">
          У цій лабораторній роботі було реалізовано навігацію за допомогою бібліотеки <strong>react-router-dom</strong>.
        </p>

        <p><strong>Ключові досягнення:</strong></p>
        
        <ul className="lab-list">
          <li className="lab-list-item">
            Додаток обгорнуто в <code>BrowserRouter</code>, що дозволяє використовувати HTML5 History API.
          </li>
          <li className="lab-list-item">
            Створено <code>MainLayout</code> з <code>Outlet</code> — глобальна оболонка, що не перемальовується при зміні сторінок.
          </li>
          <li className="lab-list-item">
            Налаштовано маршрутизацію у файлі <code>App.jsx</code> через компоненти <code>Routes</code> та <code>Route</code>.
          </li>
          <li className="lab-list-item">
            Використано <code>NavLink</code> для меню з автоматичним підсвічуванням активної вкладки.
          </li>
          <li className="lab-list-item">
            Впроваджено "Wildcard" маршрут <code>*</code> для обробки неіснуючих сторінок (404 Not Found).
          </li>
          <li className="lab-list-item">
            Підготовлено структуру для вкладеної навігації профілю, яка розвивається у наступних роботах.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Lab4;