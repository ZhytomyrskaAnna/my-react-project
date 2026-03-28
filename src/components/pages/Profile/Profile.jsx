import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../atoms/Button';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h2>Особистий кабінет</h2>
      <div className={styles.card}>
        <p><strong>Email:</strong> {user?.email || 'Не вказано'}</p>
        {user?.name && <p><strong>Ім'я:</strong> {user.name}</p>}
        <br />
        <Button onClick={logout} variant="secondary">Вийти з акаунту</Button>
      </div>
    </div>
  );
};

export default Profile;