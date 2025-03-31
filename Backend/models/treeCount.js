const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the TreeCount model (for tracking tree count)
const TreeCount = sequelize.define('TreeCount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  count: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 245136420 // Initial default count
  }
}, {
  timestamps: true,
  tableName: 'tree_counts'
});

module.exports = TreeCount; 