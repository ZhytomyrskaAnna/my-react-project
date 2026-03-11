import Button from './components/atoms/Button/Button.jsx';
import Input from './components/atoms/Input/Input.jsx'; 
import Card from './components/molecules/Card/Card.jsx'; 
import Header from "./components/organisma/Header.jsx";
import { students } from './data';

function App() {
  const handleLogin = () => {
    alert('Логіка входу буде реалізована пізніше');
  };

  return (
    <>
      
      <div style={{ padding: '20px' }}>
        <h1>Список студентів</h1>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <strong>{student.name}</strong> — Бал: {student.score} (Група {student.group})
            </li>
          ))}
        </ul>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh', // Змінив height на minHeight, щоб список зверху не перекривався
        backgroundColor: '#f0f2f5' 
      }}>
        <Card>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
            Ласкаво просимо
          </h2>

          <div style={{ marginBottom: '15px' }}>
            <Input type="email" placeholder="Email" label="Електронна пошта" />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Input type="password" placeholder="Пароль" label="Ваш пароль" />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Button onClick={handleLogin} variant="primary">
              Увійти
            </Button>
            <Button variant="secondary">
              Реєстрація
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default App;