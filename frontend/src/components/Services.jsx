import React, { useEffect, useState } from "react";
import "./Services.css";


function Services() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
      );

      if (!res.ok) {
        throw new Error("Fetch failed");
      }

      const data = await res.json();
      setExercises(data.slice(0, 40)); // fast loading
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Exercises load nahi ho rahe");
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="services">
      <h1>Exercises</h1>

      <div className="services-grid">
        {exercises.map((ex, i) => (
          <div className="card" key={i}>
            <img
              src={
                ex.images?.[0]
                  ? `https://ik.imagekit.io/yuhonas/${ex.images[0]}`
                  : "https://via.placeholder.com/300"
              }
              alt={ex.name}
            />
            <h3>{ex.name}</h3>
            <p>Level: {ex.level}</p>
            <p>Equipment: {ex.equipment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
