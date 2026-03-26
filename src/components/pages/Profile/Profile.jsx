import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import ProfileOverview from './ProfileOverview';
import ProfileSettings from './ProfileSettings';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    if (window.confirm("Ви впевнені, що хочете вийти?")) {
      navigate('/')
    }
  };

  return (
    <div className={styles.profileLayout}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Мій акаунт</h3>
        <nav className={styles.sideNav}>
          <NavLink 
            to="/profile" 
            end 
            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Інформація
          </NavLink>
  
          <NavLink 
            to="/profile/settings" 
            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Налаштування
          </NavLink>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>Вийти</button>
      </aside>

      <section className={styles.content}>
        <Routes>
          <Route index element={<ProfileOverview />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </section>
    </div>
  );
};

export default Profile;