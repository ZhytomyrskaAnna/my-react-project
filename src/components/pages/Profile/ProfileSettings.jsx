import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const [name, setName] = useState(''); 
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    
    if (name.trim() === "") {
      alert("Будь ласка, введіть ім'я");
      return;
    }

    localStorage.setItem('userName', name); 
    
    alert(`Налаштування збережено! Нове ім'я: ${name}`);
    navigate('/'); 
  };

  return (
    <div>
      <h2>Налаштування</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Змінити нікнейм:</label>
        <Input
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Нове ім'я..." 
          style={{ padding: '8px' }} 
        />
        <Button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Зберегти та повернутися на головну
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettings;