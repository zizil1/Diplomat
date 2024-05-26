const mongoose = require('mongoose');

// Определение схемы для водителя
const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Экспорт модели
module.exports = mongoose.model('Driver', DriverSchema);