# Bindal Investment Trading Platform

A full-stack MERN application for real-time Indian stock market trading and portfolio management.

## Features

- Real-time Indian stock market data
- User authentication and authorization
- Portfolio management
- Watchlist functionality
- Trading interface
- Market analysis tools
- Responsive design

## Tech Stack

- Frontend: React.js, Redux, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Data: WebSocket
- API Integration: NSE/BSE APIs

## Project Structure

```
bindal-investment/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js application
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both client and server directories
   - Add necessary API keys and configuration

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd client
   npm start
   ```

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NSE_API_KEY=your_nse_api_key
BSE_API_KEY=your_bse_api_key
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
```

## License

This project is licensed under the MIT License. 