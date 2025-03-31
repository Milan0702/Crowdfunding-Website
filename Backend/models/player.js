const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Player model (for donors)
const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  updates: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  anonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'players'
});

module.exports = Player; 