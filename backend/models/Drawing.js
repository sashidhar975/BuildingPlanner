// models/Drawing.js
const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  type: String,
  coordinates: Object,
  annotation: String,
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
