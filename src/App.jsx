import Button from './components/atoms/Button/Button.jsx';
import Input from './components/atoms/Input/Input.jsx'; 
import Card from './components/molecules/Card/Card.jsx'; 
import Header from "./components/organisma/Header.jsx";
import Post from './components/molecules/Post/Post.jsx';
import SearchBar from "./components/molecules/SearchBar/SearchBar.jsx";
import AddStudentForm from "./components/organisma/AddStudentForm/AddStudentForm.jsx";
import Home from './components/pages/Home/Home';
import Feed from './components/pages/Feed/Feed';
import Practice1 from './components/pages/practice1/Practice1';
import NotFound from './components/pages/NotFound/NotFound';
import Profile from './components/pages/Profile/Profile';

import styles from './App.module.css';
import { students, postsData, categories } from './data';
import { students as initialStudents } from './data';
import { useState } from 'react';

function App() {
  
  const [showHelp, setShowHelp] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory]=useState("All");
  const [students, setStudents] = useState(initialStudents);
  
  const totalScore = students.reduce((acc, student) => acc + (student.score || 0), 0);
  const averageScore = students.length > 0 ? (totalScore / students.length).toFixed(1) : 0;;

  const studentsToDisplay = filterActive 
    ? students.filter(s => s.score > 60) 
    : students;

  const filteredPosts = postsData.filter((post) =>{
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

     return matchesSearch && matchesCategory; 
  })  

  const handleLogin = () => {
    alert('Логіка входу буде реалізована пізніше');


  };

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element = {<Home />} />
          <Route path="feed" element ={<Feed />} />
          <Route path="practice1" element={<Practice1 />} />
          <Route path="profile/*" element ={<Profile />} />
          <Route path="*" element ={<NotFound />} />
        </Route>
      </Routes>
      
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        padding: '20px', 
        backgroundColor: '#fff',
        borderBottom: '2px solid #eee'
      }}>
        <Button 
          onClick={() => setActiveTab('list')} 
          className={activeTab === 'list' ? styles.activeTab : ''}
          variant={activeTab === 'list' ? 'primary' : 'secondary'}
        >
          Всі студенти
        </Button>
        <Button 
          onClick={() => setActiveTab('stats')} 
          className={activeTab === 'stats' ? styles.activeTab : ''}
          variant={activeTab === 'stats' ? 'primary' : 'secondary'}
        >
          Статистика
        </Button>
        <Button 
          onClick={() => setActiveTab('about')} 
          className={activeTab === 'about' ? styles.activeTab : ''}
          variant={activeTab === 'about' ? 'primary' : 'secondary'}
        >
          Про автора
        </Button>
      </nav>

      {/* КОНТЕНТ ТАБІВ */}
      <main style={{ padding: '20px', minHeight: '400px' }}>
        
        {/* Tab 1: Список студентів + Empty State */}
        {activeTab === 'list' && (
          <div>
            <h1>{filterActive ? "Успішні студенти" : "Повний список"}</h1>

            <AddStudentForm onAddStudent={handleAddStudent}/>

            <Button onClick={() => setFilterActive(!filterActive)} variant="primary">
              {filterActive ? "Показати всіх" : "Тільки успішні (>60)"}
            </Button>

            <div style={{ marginTop: '20px' }}>
              {studentsToDisplay.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'gray' }}>За вашим запитом нікого не знайдено 🔎</p>
              ) : (
                <ul>
                  {studentsToDisplay.map((student) => (
                    <li key={student.id} style={{ marginBottom: '10px' }}>
                      <strong>{student.name}</strong> — 
                      {/* Оператор нульового злиття ?? для захисту від відсутньої оцінки */}
                      Бал: {student.score ?? "Оцінка відсутня"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Статистика */}
        {activeTab === 'stats' && (
          <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px', border: '1px solid #ffb74d' }}>
            <h3>Аналітика курсу</h3>
            <p>Загальна кількість студентів: <strong>{students.length}</strong></p>
            <p>Середній бал групи: <strong>{averageScore}</strong></p>
          </div>
        )}

        {/* Tab 3: Про автора */}
        {activeTab === 'about' && (
          <Card>
            <h2>Про автора</h2>
            <p>Цю лабораторну роботу виконала студентка групи КН-22 Житомирська Анна.</p>
            <p>Вивчення React: Списки, Ключі, Умовний рендеринг та Стан.</p>
          </Card>
        )}
      </main>

      <hr />

      {/* СТРІЧКА НОВИН */}
      <section style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center' }}>Стрічка новин</h2>
        
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "20px 0" }}>
          {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? styles.active : ""}
          >
            {cat}
          </Button>
          ))}
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post key={post.id} {...post} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>
              Нічого не знайдено за вашим запитом
            </p>
          )}

        </div>
      
      </section>

      {/* ФОРМА ВХОДУ */}
      <section style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '60px 0',
        backgroundColor: '#f0f2f5' 
      }}>
        <Card>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Вхід до системи</h2>
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
      </section>
    </>
  );
}

export default App;