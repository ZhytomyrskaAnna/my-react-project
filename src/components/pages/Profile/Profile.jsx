import React from "react";

const Profile = () => {
  const user = {
    name: "Анна",
    age: 20,
    email: "anna@example.com",
    isOnline: true,
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Профіль користувача</h2>

      <p style={styles.text}>
        <strong>Ім'я:</strong> {user.name}
      </p>

      <p style={styles.text}>
        <strong>Вік:</strong> {user.age}
      </p>

      <p style={styles.text}>
        <strong>Email:</strong> {user.email}
      </p>

      <p
        style={{
          ...styles.status,
          color: user.isOnline ? "green" : "red",
        }}
      >
        {user.isOnline ? "Онлайн" : "Офлайн"}
      </p>
    </div>
  );
};

export default Profile;