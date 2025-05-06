import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5297/api/',
});

export const getWorkouts = async () => {
  try {
    const response = await api.get('workouts');
    return response.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
};

export const createWorkout = async (workout) => {
  try {
    const response = await api.post('workouts', workout);
    return response.data;
  } catch (error) {
    console.error('Error creating workout:', error);
    return null;
  }
};

export const deleteWorkout = async (id) => {
  try {
    await api.delete(`workouts/${id}`);
  } catch (error) {
    console.error('Error deleting workout:', error);
  }
};
