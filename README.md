# Crowdfunding Website for Tree Planting

A full-stack web application that allows users to donate money for tree planting initiatives. The website features a real-time tree counter, donation system, and email notifications.

## Features

- Real-time tree counter with smooth animations
- Secure donation system
- Email notifications for donors
- Responsive design
- Leaderboard of top donors
- Anonymous donation option

## Tech Stack

### Frontend
- React.js
- CSS3
- Axios for API calls

### Backend
- Node.js
- Express.js
- PostgreSQL with Sequelize ORM
- Nodemailer for email notifications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crowdfunding-website.git
cd crowdfunding-website
```

2. Install backend dependencies:
```bash
cd Backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../ecf2
npm install
```

4. Set up environment variables:

Backend (.env):
```
DATABASE_URL=your_database_url
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
PORT=4000
NODE_ENV=development
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:4000
```

5. Start the development servers:

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd ecf2
npm start
```

## Deployment

The application is deployed on:
- Frontend: Vercel
- Backend: Railway
- Database: Neon (PostgreSQL)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
