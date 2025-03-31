const sequelize = require('../config/database');
const Player = require('./player');

// Base tree count to start with (must match the value in route files)
const BASE_TREE_COUNT = 245136420;

// Initialize all models
const models = {
  Player,
  sequelize
};

// Function to initialize database and create initial tree count if needed
const initializeDatabase = async () => {
  try {
    // For existing databases, use a safer sync option
    // In development mode, we can still alter tables but with caution
    const syncOptions = process.env.NODE_ENV === 'development' 
      ? { alter: { alter: true, drop: false } } // Safer alter that doesn't drop columns
      : { alter: false };  // In production, don't alter tables automatically

    // Sync all models with the database
    await sequelize.sync(syncOptions);
    console.log(`Database synchronized successfully (${process.env.NODE_ENV} mode)`);

    // Calculate current tree count based on donations
    const result = await Player.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      raw: true
    });
    
    const totalAmount = Number(result.totalAmount || 0);
    const treesPlantedFromDonations = Math.floor(totalAmount / 100);
    const totalTreesPlanted = BASE_TREE_COUNT + treesPlantedFromDonations;
    
    console.log(`Current tree count: ${totalTreesPlanted.toLocaleString()} trees (${BASE_TREE_COUNT.toLocaleString()} base + ${treesPlantedFromDonations.toLocaleString()} from ${totalAmount.toLocaleString()} INR total donations)`);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

module.exports = {
  ...models,
  initializeDatabase
}; 