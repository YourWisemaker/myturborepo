const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5001/your-project/us-central1/api'
  : 'https://your-project.cloudfunctions.net/api';

export const api = {
  async getUsers() {
    const response = await fetch(`${API_BASE}/users`);
    return response.json();
  }
  // Add more API methods as needed
};