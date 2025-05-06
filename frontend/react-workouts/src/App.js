import React, { useEffect, useState } from 'react';
import './App.css';
import { getWorkouts, createWorkout, deleteWorkout } from './api'; // Added deleteWorkout

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    date: '',
    type: '',
    duration: '',
    caloriesBurned: '',
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Error fetching workouts.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      const newWorkout = {
        date: form.date,
        type: form.type,
        duration: parseInt(form.duration),
        caloriesBurned: parseInt(form.caloriesBurned),
      };
      const created = await createWorkout(newWorkout);
      if (created) {
        setWorkouts([...workouts, created]);
        setForm({ date: '', type: '', duration: '', caloriesBurned: '' });
      }
    } catch {
      setError("Error adding workout.");
    }
  };

  const handleDelete = async (id) => {
    await deleteWorkout(id);
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Workout Tracker</h1>
        <form onSubmit={handleAddWorkout} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required />
          <input type="text" name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
          <input type="number" name="duration" placeholder="Duration (min)" value={form.duration} onChange={handleChange} required />
          <input type="number" name="caloriesBurned" placeholder="Calories Burned" value={form.caloriesBurned} onChange={handleChange} required />
          <button type="submit">Add Workout</button>
        </form>
        <ul>
          {loading ? (
            <p>Loading...</p>
          ) : workouts.length === 0 ? (
            <p>No workouts available</p>
          ) : (
            workouts.map((w) => (
              <li key={w.id}>
                {w.date} - {w.type} - {w.duration} min - {w.caloriesBurned} cal
                <button onClick={() => handleDelete(w.id)} style={{ marginLeft: '10px' }}>Delete</button>
              </li>
            ))
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
