import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      login({ email });
      navigate('/profile', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Вхід в систему</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          label="Електронна пошта: "
        />
        <br />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          label="Пароль: "
        />
        <br />
        <Button type="submit" variant="primary">Увійти</Button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Немає акаунту? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
};

export default Login;