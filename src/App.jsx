import Button from './components/atoms/Button/Button.jsx';
import Input from './components/atoms/Input/Input.jsx'; 
import Card from './components/molecules/Card/Card.jsx'; 
import Header from "./components/organisma/Header.jsx";
import Post from './components/molecules/Post/Post.jsx';
import { students, postsData } from './data';
import { useState } from 'react';

function App() {
  
  const [showHelp, setShowHelp] = useState(false);
  
  const totalScore = students.reduce((acc, student) => acc + student.score, 0);
  const averageScore = students.length > 0 ? (totalScore / students.length).toFixed(1) : 0;

  const handleLogin = () => {
    alert('Логіка входу буде реалізована пізніше');
  };

  return (
    <>
      
      <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>

        <Button onClick={() => setShowHelp(!showHelp)} variant="secondary">
          {showHelp ? "Приховати інструкцію" : "Показати інструкцію"}
        </Button>

        {showHelp && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '5px',
            color: '#0d47a1'
          }}>
            <p><strong>Довідка:</strong> Ця сторінка дозволяє керувати списками студентів, переглядати стрічку новин та ставити лайки постам.</p>
          </div>
        )}
      </div>

      <div style={{ 
        padding: '15px', 
        margin: '20px', 
        backgroundColor: '#fff3e0', 
        borderRadius: '8px',
        border: '1px solid #ffb74d' 
      }}>
        <h3>Статистика курсу</h3>
        <p>Загальна кількість студентів: <strong>{students.length}</strong></p>
        <p>Середній бал групи: <strong style={{ color: '#e65100' }}>{averageScore}</strong></p>
      </div>

      <div style={{ padding: '20px' }}>
        <h1>Список всіх студентів</h1>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <strong>{student.name}</strong> — Бал: {student.score} (Група {student.group})
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#e8f5e9', marginTop: '20px' }}>
        <h2>Успішні студенти (бал {'>'} 60)</h2>
        <ul>
          {students
            .filter((student) => student.score > 60)
            .map((student) => (
              <li key={student.id} style={{ color: 'green', fontWeight: 'bold' }}>
                {student.name} — {student.score} балів
              </li>
            ))}
        </ul>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ textAlign: 'center' }}>Стрічка новин</h1>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {postsData.map((post) => (
            <Post
              key={post.id} 
              {...post} через spread operator
            />
          ))}
        </div>
      </div>


      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '40px 0',
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
            <Button onClick={handleLogin} variant="primary">Увійти</Button>
            <Button variant="secondary">Реєстрація</Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default App;