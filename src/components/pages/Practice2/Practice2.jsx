import React from "react";
import { students } from "../../../data.js";

const Practice2 = () => {
  
  const activeStudents = students.filter((s) => s.score !== undefined);

  const filteredStudents = activeStudents.filter((student) => student.score > 60);

  const averageScore = activeStudents.length > 0 
    ? activeStudents.reduce((sum, s) => sum + (s.score || 0), 0) / activeStudents.length 
    : 0;

  const sortedStudents = [...students].sort(
    (a, b) => (b.score || 0) - (a.score || 0)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Практична робота 2</h1>

      <h2>Всі студенти</h2>
      {students.map((student) => (
        <p
          key={student.id}
          style={{
            color: student.score !== undefined ? "black" : "gray",
            fontStyle: student.score !== undefined ? "normal" : "italic",
          }}
        >
          {student.name} — {student.score ?? "Оцінка відсутня"}
        </p>
      ))}

      <h2>Успішні студенти (бал {'>'} 60)</h2>
      {filteredStudents.map((student) => (
        <p key={student.id}>
          {student.name} — {student.score}
        </p>
      ))}

      <h2>Сортування (від більшого до меншого)</h2>
      {sortedStudents.map((student) => (
        <p key={student.id}>
          {student.name} — {student.score ?? 0}
        </p>
      ))}

      <hr />
      <h2 style={{ color: "#2c3e50" }}>
        Середній бал (серед тих, хто має оцінку): {averageScore.toFixed(2)}
      </h2>
    </div>
  );
};

export default Practice2;