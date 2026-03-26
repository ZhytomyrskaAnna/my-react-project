import React, { useState } from 'react';
import Input from "../../atoms/Input/Input.jsx";
import Button from "../../atoms/Button/Button.jsx";
import { students as initialStudents } from '../../../data.js';
import styles from './Practice4.module.css';

const Practice4 = () => {
  const [students, setStudents] = useState(initialStudents);
  const [formData, setFormData] = useState({ name: '', score: '' });
  const [errors, setErrors] = useState({});

  // Функція валідації
  const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = "Ім'я є обов'язковим";
    } else if (values.name.length < 2) {
      errors.name = "Ім'я повинно містити принаймні 2 символи";
    }

    if (values.score === "") {
      errors.score = "Будь ласка, введіть бал";
    } else if (isNaN(values.score) || values.score < 0 || values.score > 100) {
      errors.score = "Бал повинен бути числом від 0 до 100";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Самостійне завдання 2: Типізація вводу для балів
    if (name === 'score' && value !== '' && !/^\d+$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    // Валідація в реальному часі
    const validationErrors = validate({ ...formData, [name]: value });
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      const newStudent = {
        id: Date.now(),
        name: formData.name,
        score: Number(formData.score),
        group: "New"
      };
      setStudents([newStudent, ...students]);
      setFormData({ name: '', score: '' });
      setErrors({});
    }
  };

  // Самостійне завдання 1: Блокування кнопки
  const isInvalid = !formData.name || !formData.score || Object.keys(errors).length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <section className={styles.formSection}>
          <h2>Додати нового студента</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <Input
                label="Прізвище та ім'я:"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введіть ПІБ"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.inputGroup}>
              <Input
                label="Бал студента:"
                name="score"
                value={formData.score}
                onChange={handleChange}
                placeholder="0-100"
              />
              {errors.score && <span className={styles.error}>{errors.score}</span>}
            </div>

            <Button type="submit" variant="primary" disabled={isInvalid}>
              Додати студента
            </Button>
          </form>
        </section>

        <section className={styles.listSection}>
          <h2>Список студентів</h2>
          <div className={styles.list}>
            {students.map(s => (
              <div key={s.id} className={styles.studentCard}>
                <strong>{s.name}</strong> <span>{s.score} балів</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Practice4;