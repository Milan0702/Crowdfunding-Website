const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance with NeonDB PostgreSQL connection
let sequelize;

if (process.env.DATABASE_URL) {
  // If DATABASE_URL is provided, use that (NeonDB connection string)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 10, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  });
} else {
  console.error('DATABASE_URL is required for connecting to NeonDB');
  process.exit(1);
}

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection to NeonDB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to NeonDB:', error);
    throw error; // Allow the caller to handle the error
  }
};

module.exports = sequelize;
module.exports.testConnection = testConnection; 