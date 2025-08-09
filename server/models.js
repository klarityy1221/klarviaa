// Database models for Klarviaa backend
// This file defines the schema for users and other entities

const sqlite3 = require('sqlite3').verbose();

// User model
const userModel = {
  tableName: 'users',
  columns: {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    username: 'TEXT UNIQUE NOT NULL',
    name: 'TEXT NOT NULL',
    email: 'TEXT UNIQUE NOT NULL',
    password: 'TEXT NOT NULL',
    isAdmin: 'INTEGER DEFAULT 0' // 1 for admin, 0 for user
  }
};

// Example: Add more models below as needed
// const sessionModel = { ... }

module.exports = {
  userModel,
  // sessionModel,
};
