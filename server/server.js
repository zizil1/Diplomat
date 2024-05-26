const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb+srv://paintnenugen:aF1NWK8JW4vt9MJZ@diplom.9v9jvxg.mongodb.net/Drivers.Drivers';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error:', error);
});

// Driver model
const driverSchema = new mongoose.Schema({
  name: String,
  age: String
});

const Driver = mongoose.model('Driver', driverSchema);

// Routes
app.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/drivers', async (req, res) => {
  const driver = new Driver({
    name: req.body.name,
    age: req.body.age
  });

  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/add-test-drivers', async (req, res) => {
  const drivers = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 }
  ];

  try {
    await Driver.insertMany(drivers);
    res.status(201).json({ message: 'Test drivers added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/drivers/:id', async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});