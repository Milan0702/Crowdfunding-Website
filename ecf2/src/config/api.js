// API endpoint configuration

// Production API endpoint (deployed backend)
const PRODUCTION_API = process.env.REACT_APP_API_URL || 'https://crowd-funding-back-production.up.railway.app';

// Development API endpoint (local backend)
const DEVELOPMENT_API = 'http://localhost:4000';

// Use development API if in development environment, otherwise use production
const API_URL = process.env.NODE_ENV === 'development' 
  ? DEVELOPMENT_API 
  : PRODUCTION_API;

// API endpoints
const endpoints = {
  donateAmount: `${API_URL}/donateAmount`,
  treeCount: `${API_URL}/api/treeCount`,
  leaderboard: `${API_URL}/leaderboard`,
  fetchDonors: `${API_URL}/fetchDonors`,
};

export default endpoints; 