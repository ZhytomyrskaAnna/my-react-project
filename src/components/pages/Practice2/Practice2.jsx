import React from "react";
import { students } from "../../../data.js";

const Practice2 = () => {
  const filteredStudents = students.filter(
    (student) => student.isActive && student.score > 60
  );

  const activeStudents = students.filter((s) => s.isActive);

  const averageScore =
    activeStudents.reduce((sum, s) => sum + s.score, 0) /
    activeStudents.length;

  const sortedStudents = [...students].sort(
    (a, b) => b.score - a.score
  );

  return (
    <div>
      <h1>Практична робота 2</h1>

      <h2>Всі студенти</h2>
      {students.map((student) => (
        <p
          key={student.id}
          style={{
            color: student.isActive ? "black" : "gray",
            textDecoration: student.isActive ? "none" : "line-through",
          }}
        >
          {student.name} — {student.score}
        </p>
      ))}

      <h2>Активні студенти (бал {'>'} 60)</h2>
      {filteredStudents.map((student) => (
        <p key={student.id}>
          {student.name} — {student.score}
        </p>
      ))}

      <h2>Сортування (від більшого до меншого)</h2>
      {sortedStudents.map((student) => (
        <p key={student.id}>
          {student.name} — {student.score}
        </p>
      ))}

      <h2>
        Середній бал активних студентів: {averageScore.toFixed(2)}
      </h2>
    </div>
  );
};

export default Practice2;