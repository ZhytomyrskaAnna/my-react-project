import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from './MainLayout.module.css';
import Header from '../../organisma/Header';
import Button from '../../atoms/Button/Button';
import useThemeContext from '../../../hooks/useThemeContext';

const MainLayout = () => {

  const { isAuthenticated } = useContext(AuthContext);

  const getActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const [theme, setTheme] = useThemeContext;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'daek' : 'light');
  };

  const themeIcon = theme === 'light' ? '☀️' : '🌙';

  const themeButtonText = `${themeIcon} ${theme === 'light' ? 'Світла тема' : 'Темна тема'}`;

  const themeButton = <Button onClick={toggleTheme}>{themeButtonText}</Button>

  return (
    <div className={styles.wrapper} data-theme={theme}>
        <Header />
      <nav className={styles.navbar}>
        <NavLink to="/" className={getActiveClass} end>Головна</NavLink>
        <NavLink to="/feed" className={getActiveClass}>Стрічка</NavLink>
        <NavLink to="/practice1" className={getActiveClass}>Практична робота №1</NavLink>
        <NavLink to="/practice2" className={getActiveClass}>Практична робота №2</NavLink>
        <NavLink to="/practice3" className={getActiveClass}>Практична робота №3</NavLink>
        <NavLink to="/practice4" className={getActiveClass}>Практична робота №4</NavLink>
        <NavLink to="/practice5" className={getActiveClass}>Практична робота №5</NavLink>
        <NavLink to="/practice6" className={getActiveClass}>Практична робота №6</NavLink>
        <NavLink to="/practice7" className={getActiveClass}>Практична робота №7</NavLink>
        <NavLink to="/practice8" className={getActiveClass}>Практична робота №8</NavLink>
        <NavLink to="/lab1" className={getActiveClass}>Лабораторна робота №1</NavLink>
        <NavLink to="/lab2" className={getActiveClass}>Лабораторна робота №2</NavLink>
        <NavLink to="/lab3" className={getActiveClass}>Лабораторна робота №3</NavLink>
        <NavLink to="/lab4" className={getActiveClass}>Лабораторна робота №4</NavLink>
        <NavLink to="/lab5" className={getActiveClass}>Лабораторна робота №5</NavLink>
        <NavLink to="/lab6" className={getActiveClass}>Лабораторна робота №6</NavLink>
        {isAuthenticated ? (
          <NavLink to="/profile" className={getActiveClass}>Особистий кабінет</NavLink>
        ) : (
          <>
            <NavLink to="/login" className={getActiveClass}>Вхід</NavLink>
            <NavLink to="/register" className={getActiveClass}>Реєстрація</NavLink>
          </>
        )}
        {themeButton}
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        Розроблено в рамках лабораторної роботи №4
      </footer>
    </div>
  );
};

export default MainLayout;