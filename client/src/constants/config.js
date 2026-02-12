// API base URL - uses environment variable or defaults based on environment
// Local development: http://localhost:5000/api
// Production: https://car-loans-and-sales.onrender.com/api
const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://car-loans-and-sales.onrender.com/api'
    : 'http://localhost:5000/api'
);

export { API_BASE_URL };
