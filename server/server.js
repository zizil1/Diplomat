const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Middleware для обработки данных JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware для обработки данных формы

// MongoDB connection
const mongoURL = 'mongodb+srv://paintnenugen:aF1NWK8JW4vt9MJZ@diplom.9v9jvxg.mongodb.net/mydatabase';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Registration route
app.post('/api/register', async (req, res) => {
    console.log('Request body:', req.body); // Logging request body for debugging
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already in use.');
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            // Успешный вход
            res.status(200).send('Login successful');
        } else {
            // Неверные учетные данные
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});