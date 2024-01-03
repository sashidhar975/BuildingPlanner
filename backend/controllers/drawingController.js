// controllers/drawingController.js
const Drawing = require('../models/Drawing');

// Controller function to get all drawings
const getAllDrawings = async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.json(drawings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new drawing
const createDrawing = async (req, res) => {
  const { type, coordinates, annotation } = req.body;
  const newDrawing = new Drawing({ type, coordinates, annotation });

  try {
    const savedDrawing = await newDrawing.save();
    res.json(savedDrawing);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDrawings,
  createDrawing,
};
