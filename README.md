# Simple Event Management

A simple Node.js & Express.js application for creating and managing events, backed by MongoDB and Mongoose.

## Table of Contents

- [Simple Event Management](#simple-event-management)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Clone the Repository](#clone-the-repository)
    - [Environment Variables](#environment-variables)
    - [Install Dependencies](#install-dependencies)
    - [Setting Up MongoDB](#setting-up-mongodb)
  - [Running the Application](#running-the-application)
  - [API Reference](#api-reference)
    - [Create Event (POST /events)](#create-event-post-events)
    - [List Events (GET /events)](#list-events-get-events)
    - [Get Event by ID (GET /events/:id)](#get-event-by-id-get-eventsid)
    - [Update Event (PUT /events/:id)](#update-event-put-eventsid)
    - [Delete Event (DELETE /events/:id)](#delete-event-delete-eventsid)
  - [Project Structure](#project-structure)

## Prerequisites

- Node.js v14+  
- npm or yarn  
- MongoDB (local or Atlas)

## Setup

### Clone the Repository

```bash
git clone https://github.com/TitanNatesan/simple-event-management.git
cd simple-event-management
```

### Environment Variables

Create a `.env` file in the project root:

```dotenv
MONGO_URL="mongodb://localhost:27017/event-management"
PORT=8000
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Setting Up MongoDB

- **Local MongoDB**  
  1. Download and install MongoDB Community Server: https://www.mongodb.com/try/download/community  
  2. Start the MongoDB service:  
     ```bash
     mongod --dbpath /path/to/your/db
     ```  
- **MongoDB Atlas**  
  1. Create a free cluster at https://cloud.mongodb.com/  
  2. Obtain the connection URI and set `MONGO_URL` in your `.env`.

## Running the Application

```bash
npm run dev
```

This runs `nodemon src/index.js`, which will:

- Connect to MongoDB using [`mongoose.connect`](https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect)  
- Start the Express server on `http://localhost:${PORT}`  

You should see logs:

```
Server is starting...
Connected to MongoDB
Server is running on port 8000
```

## API Reference

All endpoints use JSON. Base URL: `http://localhost:${PORT}`

### Create Event (POST /events)

- **URL**: `/events`  
- **Method**: `POST`  
- **Body**:
  ```json
  {
    "title": "Conference",
    "description": "Annual tech conference",
    "date": "2024-10-15T09:00:00.000Z"
  }
  ```
- **Success Response**:
  - **Code**: 201  
  - **Content**: Created event object  
- **Schema**: [`eventSchema`](src/schema.js)

### List Events (GET /events)

- **URL**: `/events`  
- **Method**: `GET`  
- **Success Response**:
  - **Code**: 200  
  - **Content**: Array of event objects  

### Get Event by ID (GET /events/:id)

- **URL**: `/events/{id}`  
- **Method**: `GET`  
- **Success Response**:
  - **Code**: 200  
  - **Content**: Single event object  
- **Error**: 404 if not found  

### Update Event (PUT /events/:id)

- **URL**: `/events/{id}`  
- **Method**: `PUT`  
- **Body**: Same as create  
- **Success Response**:
  - **Code**: 200  
  - **Content**: Updated event object  
- **Error**: 404 if not found  

### Delete Event (DELETE /events/:id)

- **URL**: `/events/{id}`  
- **Method**: `DELETE`  
- **Success Response**:
  - **Code**: 200  
  - **Content**:
    ```json
    { "message": "Event deleted successfully" }
    ```
- **Error**: 404 if not found  

## Project Structure

```
.
├── .env
├── package.json
├── README.md          # ← You are here
└── src
    ├── index.js       # Server & routes setup
    ├── schema.js      # Mongoose event schema
    └── models.js      # Mongoose model
```

- Server logic: [`src/index.js`](src/index.js)  
- Schema definition: [`src/schema.js`](src/schema.js)  
- Model export: [`src/models.js`](src/models.js)  