const express = require('express');
const router = express.Router();
const { Player, sequelize } = require('../models');
const { sendThankYouEmail } = require('../utils/emailService');

// Base tree count to start with (must match the value in treeCountRoutes.js)
const BASE_TREE_COUNT = 245136420;

// Route to Record Donation and Send Email
router.post('/donateAmount', async (req, res) => {
  // Start a transaction to ensure data consistency
  const transaction = await sequelize.transaction();
  
  try {
    const { amount, Fname, Femail, Fphone, Fmsg, check1, check2 } = req.body;

    console.log(`Processing new donation: ${amount} INR from ${Fname}`);

    // Validate required fields
    if (!amount || !Fname || !Femail || !Fphone) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Validate amount is a positive number
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Femail)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Validate phone format - basic check for digits only
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(Fphone)) {
      return res.status(400).json({ error: "Phone number should contain only digits." });
    }

    // Save donor data to database - handle phone as string
    const newPlayer = await Player.create({
      name: Fname,
      email: Femail,
      phone: Fphone.toString(), // Ensure phone is stored as string
      amount: parseInt(amount, 10), // Ensure amount is an integer
      message: Fmsg || "",
      updates: check1 || false,
      anonymous: check2 || false
    }, { transaction });

    // Calculate the number of trees to plant based on the donation amount
    const treesPlanted = Math.floor(amount / 100); // Assume 1 tree per 100 INR

    // Calculate the new total tree count from donations
    const result = await Player.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      transaction,
      raw: true
    });
    
    const totalAmount = Number(result.totalAmount || 0);
    const treesPlantedFromDonations = Math.floor(totalAmount / 100);
    const totalTreesPlanted = BASE_TREE_COUNT + treesPlantedFromDonations;

    console.log(`Donation successful! ${treesPlanted} trees planted, total now: ${treesPlantedFromDonations} trees from all donations`);

    // Commit the transaction
    await transaction.commit();

    // Send thank you email asynchronously (don't wait for it to complete)
    sendThankYouEmail(
      { name: Fname, email: Femail, amount },
      treesPlanted
    ).catch(err => console.error('Email sending error:', err));

    // Return success response with freshly calculated tree data
    const treeCountData = {
      treesPlanted,
      totalTreesPlanted: BASE_TREE_COUNT + treesPlantedFromDonations,
      fromDonations: treesPlantedFromDonations,
      totalDonations: totalAmount,
      baseCount: BASE_TREE_COUNT,
      timestamp: Date.now()
    };

    res.status(201).json({
      message: "Donation recorded, trees planted, and email sent!",
      data: newPlayer,
      treeCountData
    });
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    
    console.error('Error processing donation:', error);
    
    // Return more informative error messages
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: "Validation error", 
        details: error.errors.map(e => e.message) 
      });
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: "A record with this data already exists." });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to Fetch Leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    console.log('Fetching leaderboard data...');
    
    // First check if we have any players in the database
    const playerCount = await Player.count();
    console.log(`Total players in database: ${playerCount}`);
    
    if (playerCount === 0) {
      console.log('No players found in database, returning empty leaderboard');
      return res.status(200).json([]);
    }
    
    const leaderboardData = await Player.findAll({
      attributes: ['name', 'amount', 'message'],
      where: {
        // Don't include anonymous donations in the leaderboard
        anonymous: false
      },
      order: [['amount', 'DESC']],
      limit: 50, // Limit to top 50 donors for better performance
      raw: true
    });
    
    console.log(`Found ${leaderboardData.length} entries for leaderboard`);
    
    // Add trees planted calculation for each donation
    const leaderboardWithTrees = leaderboardData.map(entry => ({
      ...entry,
      treesPlanted: Math.floor(entry.amount / 100)
    }));
    
    res.status(200).json(leaderboardWithTrees);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to check database status
router.get('/dbStatus', async (req, res) => {
  try {
    // Get total donation count
    const donorCount = await Player.count();
    
    // Get total donation amount
    const totalResult = await Player.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      raw: true
    });
    
    const totalAmount = Number(totalResult.totalAmount || 0);
    const treesPlanted = Math.floor(totalAmount / 100);
    
    // Get anonymous vs public donations
    const anonymousCount = await Player.count({
      where: { anonymous: true }
    });
    
    const publicCount = donorCount - anonymousCount;
    
    res.status(200).json({
      status: 'ok',
      statistics: {
        totalDonors: donorCount,
        totalAmount,
        treesPlanted,
        totalTreeCount: BASE_TREE_COUNT + treesPlanted,
        anonymousDonations: anonymousCount,
        publicDonations: publicCount
      }
    });
  } catch (error) {
    console.error('Error fetching database status:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to retrieve database status',
      error: error.message
    });
  }
});

// Route to Fetch Donor Names
router.get('/fetchDonors', async (req, res) => {
  try {
    const donors = await Player.findAll({
      attributes: ['name'],
      where: {
        // Don't include anonymous donations
        anonymous: false
      },
      order: [['amount', 'DESC']],
      raw: true
    });
    
    res.status(200).json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DEVELOPMENT ONLY: Route to add sample data for testing
if (process.env.NODE_ENV === 'development') {
  router.post('/dev/addSample', async (req, res) => {
    try {
      console.log('Adding sample data for testing...');
      
      // Create some sample donations
      const sampleDonations = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          amount: 1000, // 10 trees
          message: 'Save the planet!',
          updates: true,
          anonymous: false
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '9876543210',
          amount: 2000, // 20 trees
          message: 'For a greener future',
          updates: false,
          anonymous: false
        },
        {
          name: 'Anonymous Hero',
          email: 'hero@example.com',
          phone: '5555555555',
          amount: 5000, // 50 trees
          message: 'Plant more trees',
          updates: true,
          anonymous: true // Won't show in leaderboard
        }
      ];
      
      // Create records
      await Player.bulkCreate(sampleDonations);
      
      console.log('Sample data added successfully');
      
      res.status(200).json({ 
        message: 'Sample data added successfully',
        count: sampleDonations.length
      });
    } catch (error) {
      console.error('Error adding sample data:', error);
      res.status(500).json({ error: "Failed to add sample data" });
    }
  });
}

module.exports = router; 