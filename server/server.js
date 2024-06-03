const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios')





// Создаем модель и связываем ее с коллекцией 'zakaz'


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

  

    const Zakaz = require('./models/Zakaz');

    app.post('/api/zakazy', async (req, res) => {
        try {
            console.log('Received zakaz data:', req.body);
            const newZakaz = new Zakaz(req.body);
            await newZakaz.save();
            res.status(201).send('Zakaz created successfully');
        } catch (error) {
            console.error('Error creating zakaz:', error);
            res.status(500).send('Error creating zakaz');
        }
    });
    
    // Получение всех заказов
    app.get('/api/zakazy', async (req, res) => {
        try {
            const zakazy = await Zakaz.find();
            res.json(zakazy);
        } catch (error) {
            console.error('Error fetching zakazy:', error);
            res.status(500).send('Error fetching zakazy');
        }
    });

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    dateOfBirth: String
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
        await newUser.save().then( (res) => {
            console.log(res)
        });
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
            res.status(200).json({ username: user.username, email: user.email });
        } else {
            // Неверные учетные данные
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

// Update profile route
app.post('/api/updateProfile', async (req, res) => {
  const { username, email, phone, dateOfBirth } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.username = username;
    user.phone = phone;
    user.dateOfBirth = dateOfBirth;
    await user.save(); // TODO CHTO S POTOKOM?
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Error updating profile');
  }
});

// Logout route

app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Error destroying session');
      } else {
        res.status(200).send('Logout successful');
      }
    });
});


const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true }
});
const Driver = mongoose.model('Driver', driverSchema);

// Get all drivers route
app.get('/api/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).send('Error fetching drivers');
    }
});


// Add driver route
app.post('/api/drivers', async (req, res) => {
    console.log('Request body:', req.body); // Logging request body for debugging
    const { name, surname, phoneNumber, city } = req.body;
    try {
        const newDriver = new Driver({ name, surname, phoneNumber, city });
        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).send('Error adding driver');
    }
});

app.delete('/api/drivers/:id', async (req, res) => {
    const {id} = req.params;
    try {
        console.log('Deleting driver:', id);
        await Driver.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).send('Error deleting driver');
    }
});

app.post('/api/route', async (req, res) => {
    const { startCoords, endCoords } = req.body;
    try {
        const response = await axios.get(
            `https://api-maps.yandex.ru/services/route/2.0/?apikey=d4045940-53f3-4b12-b60d-2769f3ed6c13&lang=ru_RU&format=json&mode=driving&waypoints=${startCoords.join(',')}&waypoints=${endCoords.join(',')}`
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).send('Error fetching route');
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
