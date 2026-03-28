import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../atoms/Button/Button.jsx';

const Lab5 = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <section className="section">
      <h2>Лабораторна 5: Context API та Захищені Маршрути</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <p>
          У цій лабораторній роботі було реалізовано глобальне управління станом авторизації за допомогою <strong>React Context API</strong>. Це дозволило уникнути проблеми "prop drilling", коли дані користувача доводилося б передавати через багато рівнів компонентів.
        </p>
        <br />
        <p><strong>Що було зроблено:</strong></p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' }}>
          <li>
            <p>Створено <code>AuthContext</code> та компонент-провайдер <code>AuthProvider</code>, який зберігає стан авторизації (<code>isAuthenticated</code>, дані користувача <code>user</code>) та методи (<code>login</code>, <code>logout</code>).</p>
          </li>
          <li>
            <p>Реалізовано сторінки <strong>Логіну</strong> та <strong>Реєстрації</strong> з використанням атомарних компонентів (Input, Button).</p>
          </li>
          <li>
            <p>Створено Higher-Order Component (HOC) – <code>ProtectedRoute</code>, який перевіряє, чи авторизований користувач. Якщо ні – відбувається автоматичне перенаправлення на сторінку входу.</p>
          </li>
          <li>
            <p>Розроблено захищену сторінку <strong>Особистий кабінет (Profile)</strong>, доступ до якої можливий лише після успішної автентифікації.</p>
          </li>
          <li>
            <p>Навігація (<code>MainLayout</code>) динамічно оновлюється: гості бачать посилання "Вхід" та "Реєстрація", а авторизовані користувачі – "Особистий кабінет".</p>
          </li>
        </ul>
      </div>

      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '1rem' }}>
        <h3>Демонстрація нижче (Статус авторизації)</h3>
        {isAuthenticated ? (
          <>
            <p>Ви увійшли як: <strong>{user?.email}</strong> {user?.name ? `(${user.name})` : ''}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <Link to="/profile">
                <Button variant="primary">Перейти в Профіль</Button>
              </Link>
              <Button onClick={logout} variant="secondary">Вийти</Button>
            </div>
          </>
        ) : (
          <>
            <p>Ви не авторизовані. Будь ласка, увійдіть або зареєструйтесь.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <Link to="/login">
                <Button variant="primary">Вхід</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">Реєстрація</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Lab5;