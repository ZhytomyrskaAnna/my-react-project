const ProfileOverview = () => {
  const savedName = localStorage.getItem('userName') || "Студент Розробник";

  return (
    <div>
      <h2>Огляд профілю</h2>
      <p><strong>Ім'я:</strong> {savedName}</p>
      <p><strong>Email:</strong> student@example.com</p>
    </div>
  );
};