# School Management API

A Node.js + Express.js + MySQL backend project for managing schools and sorting them based on proximity to the user.

---

- Backend - https://school-management-api-tjdf.onrender.com

## Features

- Add new schools
- Fetch schools sorted by distance
- Input validation
- REST APIs
- MySQL database integration
- Haversine formula for distance calculation

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JavaScript

---

## API Endpoints

### Add School

POST `/addSchool`

#### Request Body

```json
{
  "name": "Delhi Public School",
  "address": "New Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

---

### List Schools

GET `/listSchools?latitude=28.6139&longitude=77.2090`

Returns schools sorted by proximity.

---

## Installation

```bash
git clone https://github.com/Anuj-Kumar0/school-management-api

cd school-management-api

npm install
```

---

## Environment Variables

Create `.env`

```env
PORT=5000

DB_URL=DATABASE_URL
```

---

## Run Locally

```bash
npm run dev
```

---

## Database Schema

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```