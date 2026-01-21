# Daily Notes API - Backend

A Node.js backend server with MongoDB integration for managing daily developer notes using MVC architecture.

## Features

- RESTful API for creating daily notes
- MongoDB database integration
- MVC architecture pattern
- Environment-based configuration
- CORS enabled for cross-origin requests

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── DailyNote.js         # Mongoose model for daily notes
├── controllers/
│   └── dailyNoteController.js  # Business logic for daily notes
├── routes/
│   └── dailyNoteRoutes.js   # API route definitions
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── server.js               # Main application entry point
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:
   - Open `.env` file
   - Replace `MONGO_URI` with your MongoDB connection string

## Environment Variables

```env
MONGO_URI=mongodb://localhost:27017/dailynotes
PORT=4000
```

## Running the Server

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on `http://localhost:4000`

## API Endpoints

### Create Daily Note

**POST** `/api/daily-notes`

**Request Body:**

```json
{
  "previousDayWork": "Implemented user authentication",
  "todayPlan": "Work on dashboard UI",
  "hasBlocker": false
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "previousDayWork": "Implemented user authentication",
    "todayPlan": "Work on dashboard UI",
    "hasBlocker": false,
    "createdAt": "2026-01-20T07:15:20.000Z",
    "updatedAt": "2026-01-20T07:15:20.000Z"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Please provide all required fields: previousDayWork, todayPlan, and hasBlocker"
}
```

## Testing the API

Using curl:

```bash
curl -X POST http://localhost:4000/api/daily-notes \
  -H "Content-Type: application/json" \
  -d '{
    "previousDayWork": "Fixed bugs in login module",
    "todayPlan": "Implement password reset feature",
    "hasBlocker": false
  }'
```

## Database Schema

### DailyNote Model

| Field           | Type    | Required | Description                                |
| --------------- | ------- | -------- | ------------------------------------------ |
| previousDayWork | String  | Yes      | What the developer did on the previous day |
| todayPlan       | String  | Yes      | What the developer will do today           |
| hasBlocker      | Boolean | Yes      | Whether there is any blocker (yes/no)      |
| createdAt       | Date    | Auto     | Timestamp when the note was created        |
| updatedAt       | Date    | Auto     | Timestamp when the note was last updated   |

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **nodemon** - Development auto-restart tool
