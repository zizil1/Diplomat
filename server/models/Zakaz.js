const mongoose = require('mongoose');

const zakazSchema = new mongoose.Schema({
    name: String,
    adress: String,
    time: String,
    ves: String,
    ras: String,
    driver: String,
    orderDate: String,
    startPoint: String,
    endPoint: String
});

// Использование коллекции 'zakaz'
const Zakaz = mongoose.model('Zakaz', zakazSchema, 'zakaz');

module.exports = Zakaz;