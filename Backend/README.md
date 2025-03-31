# CrowdFunding Backend

This is the backend for the CrowdFunding tree planting website. It uses Node.js, Express, and PostgreSQL (via NeonDB) to manage donations, tree counts, and email notifications.

## Features

- PostgreSQL database using NeonDB
- RESTful API for donations and tree counts
- Email notifications for donations
- Transaction support for data consistency
- Error handling and logging
- Health check endpoint

## Prerequisites

- Node.js 14.x or higher
- NeonDB account (PostgreSQL database)
- npm or yarn

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DATABASE_URL=your_neondb_connection_string

# Email Configuration
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

# Server Configuration
PORT=4000
NODE_ENV=development
```

## Installation

1. Clone the repository
2. Navigate to the Backend directory
3. Install dependencies:

```bash
npm install
```

## Setting up NeonDB

1. Create an account at [NeonDB](https://neon.tech)
2. Create a new project and database
3. Get your connection string from the NeonDB dashboard
4. Update your `.env` file with the connection string

## Running the Application

To start the development server:

```bash
npm run dev
```

To start in production mode:

```bash
npm start
```

## API Endpoints

### Donations

- **POST /donateAmount** - Record a donation and send thank you email
  - Required fields: `amount`, `Fname`, `Femail`, `Fphone`
  - Optional fields: `Fmsg`, `check1` (updates), `check2` (anonymous)

- **GET /leaderboard** - Get top 50 donors by amount
  - Returns: Array of donors with name, amount, and message

- **GET /fetchDonors** - Get list of all donor names
  - Returns: Array of donor names

### Tree Count

- **GET /api/treeCount** - Get current tree count
  - Returns: Object with count property

### System

- **GET /health** - Health check endpoint
  - Returns: Status of the server

## Architecture

The backend follows a modular architecture:

- **config/** - Database configuration
- **models/** - Data models for Sequelize ORM
- **routes/** - API route handlers
- **utils/** - Utility functions like email sending

## Database Schema

### Players Table

- **id**: Auto-incremented primary key
- **name**: Donor's name
- **email**: Donor's email
- **phone**: Donor's phone number
- **amount**: Donation amount in INR
- **message**: Optional message
- **updates**: Whether donor wants updates
- **anonymous**: Whether donation is anonymous
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update

### Tree Counts Table

- **id**: Auto-incremented primary key
- **count**: Total tree count
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update

## License

MIT 