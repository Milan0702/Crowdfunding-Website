const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./models');
const donationsRoutes = require('./routes/donationsRoutes');
const treeCountRoutes = require('./routes/treeCountRoutes');
require('dotenv').config();
const dotenv = require('dotenv');
const morgan = require('morgan');
const { testConnection } = require('./config/database');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use(donationsRoutes);
app.use(treeCountRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test the database connection first
    await testConnection();
    
    // Then initialize database models and relationships
    await initializeDatabase();
    
    // Start the server only if database is connected
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Database: NeonDB (PostgreSQL)`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit with error code
  }
};

// Start the server
startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Don't exit the process, just log the error
});
