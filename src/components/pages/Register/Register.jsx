import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Input from '../../atoms/Input/Input.jsx';
import Button from '../../atoms/Button/Button.jsx';
import styles from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name) {
      // Simulate registration and auto-login
      login({ email, name });
      navigate('/profile', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          label="Ім'я: "
        />
        <br />
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
        <Button type="submit" variant="primary">Зареєструватися</Button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Вже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default Register;