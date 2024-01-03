# BuildingPlanne



Welcome to the BuildingPlanne! This application allows users to create drawings on a canvas, annotate shapes, and save their drawings for future reference.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is a full-stack drawing application built with React.js for the frontend, Node.js for the backend, and MongoDB for data storage. It provides a simple canvas where users can draw shapes (rectangle, circle, line) and toggle annotations for each shape.

## Project Structure

Wireone/
|-- backend/
| |-- server.js
| |-- models/
| | |-- drawing.js
| |-- routes/
| | |-- drawingRoutes.js
| |-- controllers/
| |-- drawingController.js
|
|-- frontend/
| |-- src/
| | |-- components/
| | | |-- DrawingCanvas.jsx
| | | |-- ViewTool.jsx
| | | |-- App.jsx
| | |
| | |-- index.js
| |
| |-- public/
| | |-- index.html
|
|-- .env
|-- package.json
|-- README.md


## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- Code editor (e.g., VSCode, Atom)

### Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend

Install backend dependencies:
  npm init
  npm install
  npm i mongoose dotenv express cors


PORT=5000
MONGODB_URI=""

Start the backend server:
npm start

Frontend Setup
Navigate to the frontend folder:
cd frontend
npm install
npm run dev
