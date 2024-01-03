// routes/drawingRoutes.js
const express = require('express');
const drawingController = require('../controllers/drawingController');

const router = express.Router();

// Define routes for drawings
router.get('/drawings', drawingController.getAllDrawings);
router.post('/drawings', drawingController.createDrawing);

module.exports = router;
