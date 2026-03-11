import Button from './components/atoms/Button/Button.jsx';
import Input from './components/atoms/Input/Input.jsx'; 
import Card from './components/molecules/Card/Card.jsx'; 
import Header from "./components/organisma/Header.jsx";
import Post from './components/molecules/Post/Post.jsx';
import { students, postsData } from './data';
import { useState } from 'react';

function App() {
  
  const [showHelp, setShowHelp] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  
  const totalScore = students.reduce((acc, student) => acc + student.score, 0);
  const averageScore = students.length > 0 ? (totalScore / students.length).toFixed(1) : 0;

   const studentsToDisplay = filterActive 
    ? students.filter(s => s.score > 60) 
    : students;

  const handleLogin = () => {
    alert('Логіка входу буде реалізована пізніше');
  };

  return (
    <>
      
      {/* НАВІГАЦІЯ (Таби) */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '10px', 
      padding: '20px', 
      backgroundColor: '#fff',
      borderBottom: '2px solid #eee'
    }}>
      <Button 
        onClick={() => setActiveTab('list')} 
        variant={activeTab === 'list' ? 'primary' : 'secondary'}
      >
        Всі студенти
      </Button>
      <Button 
        onClick={() => setActiveTab('stats')} 
        variant={activeTab === 'stats' ? 'primary' : 'secondary'}
      >
        Статистика
      </Button>
      <Button 
        onClick={() => setActiveTab('about')} 
        variant={activeTab === 'about' ? 'primary' : 'secondary'}
      >
        Про автора
      </Button>
    </div>

    <div style={{ padding: '20px', minHeight: '400px' }}>
      
      {/* Tab 1: Список студентів */}
      {activeTab === 'list' && (
        <div>
          <h1>Список студентів</h1>
          <Button onClick={() => setFilterActive(!filterActive)} variant="primary">
            {filterActive ? "Показати всіх" : "Показати тільки успішних"}
          </Button>
          <ul>
            {studentsToDisplay.map((student) => (
              <li key={student.id}>
                <strong>{student.name}</strong> — Бал: {student.score}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tab 2: Статистика */}
      {activeTab === 'stats' && (
        <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px' }}>
          <h3>Аналітика курсу</h3>
          <p>Загальна кількість: <strong>{students.length}</strong></p>
          <p>Середній бал: <strong>{averageScore}</strong></p>
        </div>
      )}

      {/* Tab 3: Про автора */}
      {activeTab === 'about' && (
        <Card>
          <h2>Про автора</h2>
          <p>Цю лабораторну роботу виконав студент групи 101.</p>
          <p>Вивчення React: Lists, Keys & Conditional Rendering.</p>
        </Card>
      )}

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