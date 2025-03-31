const express = require('express');
const router = express.Router();
const { Player, sequelize } = require('../models');

// Base tree count to start with
const BASE_TREE_COUNT = 245136420; // The original count from the project

// Route to fetch current tree count calculated from donations
router.get('/api/treeCount', async (req, res) => {
  try {
    // Set headers to prevent caching
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    // Calculate tree count by summing all donations and dividing by 100
    // Using Sequelize's SUM function to calculate the total donations
    const result = await Player.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      raw: true
    });
    
    // Extract the total amount
    const totalAmount = Number(result.totalAmount || 0);
    
    // Calculate trees planted (1 tree per 100 INR) plus the base count
    const treesPlantedFromDonations = Math.floor(totalAmount / 100);
    const totalTreesPlanted = BASE_TREE_COUNT + treesPlantedFromDonations;
    
    console.log(`Tree count calculated: ${totalTreesPlanted.toLocaleString()} trees (${BASE_TREE_COUNT.toLocaleString()} base + ${treesPlantedFromDonations.toLocaleString()} from donations)`);
    console.log(`Total donations: ${totalAmount.toLocaleString()} INR`);
    
    return res.status(200).json({ 
      count: totalTreesPlanted,
      baseCount: BASE_TREE_COUNT,
      fromDonations: treesPlantedFromDonations,
      totalDonations: totalAmount,
      timestamp: Date.now() // Add timestamp to ensure fresh data
    });
  } catch (error) {
    console.error('Error calculating tree count:', error);
    
    // Check for specific database connection errors
    if (error.name === 'SequelizeConnectionError' || error.name === 'SequelizeConnectionRefusedError') {
      return res.status(503).json({ 
        error: 'Database connection error',
        count: BASE_TREE_COUNT, // Use base count as fallback
        baseCount: BASE_TREE_COUNT,
        fromDonations: 0,
        totalDonations: 0,
        note: 'Base count returned due to database connection issue',
        timestamp: Date.now()
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      count: BASE_TREE_COUNT, // Use base count as fallback
      baseCount: BASE_TREE_COUNT,
      fromDonations: 0,
      totalDonations: 0,
      note: 'Base count returned due to server error',
      timestamp: Date.now()
    });
  }
});

module.exports = router; 