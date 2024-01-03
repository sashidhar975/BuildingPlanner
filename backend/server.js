const express = require('express');
const mongoose = require('mongoose'); // Add this line to import mongoose
const cors = require('cors');
const dotenv = require('dotenv');
const drawingRoutes = require('./routes/drawingRoutes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas Successfully');
    
    // Close the MongoDB connection when the Node.js application is terminated
    process.on('SIGINT', () => {
      mongoose.connection.close();
      console.log('MongoDB Atlas connection closed');
      process.exit();
    });
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
}

connectToMongoDB();


app.options('*', cors());


// Use the drawing router
app.use('/api', drawingRoutes);

app.get('/api/drawings', async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.json(drawings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/drawings', async (req, res) => {
  const { type, coordinates, annotation } = req.body;
  const newDrawing = new Drawing({ type, coordinates, annotation });

  try {
    const savedDrawing = await newDrawing.save();
    res.json(savedDrawing);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
