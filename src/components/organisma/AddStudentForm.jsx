import { useState } from "react";
import Input from "./atoms/Input";
import Button from "./atoms/Button";

//Function validation
const validate = (values) => {
    const errors = {};
  
    // Ім'я
    if (!values.name.trim()) {
      errors.name = "Ім'я є обов'язковим для заповнення";
    } else if (values.name.trim().length < 2) {
      errors.name = "Ім'я повинно містити принаймні 2 символи";
    }
  
    // Бал
    if (values.score === "") {
      errors.score = "Будь ласка, введіть бал";
    } else if (
      isNaN(values.score) ||
      Number(values.score) < 0 ||
      Number(values.score) > 100
    ) {
      errors.score = "Бал повинен бути числом від 0 до 100";
    }
  
    return errors;
  };
  
  function AddStudentForm({ onAddStudent }) {
    const [formData, setFormData] = useState({
      name: "",
      score: "",
    });
  
    const [errors, setErrors] = useState({});
  
    
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      const updatedData = {
        ...formData,
        [name]: value,
      };
  
      setFormData(updatedData);
  
    
      const validationErrors = validate(updatedData);
      setErrors(validationErrors);
    };
  
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const validationErrors = validate(formData);
  
      if (Object.keys(validationErrors).length === 0) {
        onAddStudent({
          id: Date.now(),
          name: formData.name.trim(),
          score: Number(formData.score),
        });
  
        setFormData({ name: "", score: "" });
        setErrors({});
      } else {
        setErrors(validationErrors);
      }
    };
  
    
    const isFormValid =
      formData.name.trim() &&
      formData.score !== "" &&
      Object.keys(errors).length === 0;
  
    return (
      <form onSubmit={handleSubmit}>
        <Input
          label="Прізвище та ім'я:"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введіть ПІБ"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
  
        <Input
          label="Бал студента:"
          name="score"
          type="number"
          value={formData.score}
          onChange={handleChange}
          placeholder="0-100"
        />
        {errors.score && <p style={{ color: "red" }}>{errors.score}</p>}
  
        <Button type="submit" disabled={!isFormValid}>
          Додати студента
        </Button>
      </form>
    );
}
  
  export default AddStudentForm;
 
  
 