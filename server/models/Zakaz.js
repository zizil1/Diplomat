const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const zakazSchema = new mongoose.Schema({
    name: { type: String, required: true },
    adress: { type: String, required: true },
    time: { type: String, required: true },
    ves: { type: String, required: true },
    ras: { type: String, required: true },
    startPoint:{type:String, require: true}, 
    endPoint: {type:String, require: true},
    isFrozen: { type: Boolean, default: false },
    isPerishable: { type: Boolean, default: false },
    isHighVehicle: { type: Boolean, default: false },
    isHazardous: { type: Boolean, default: false },
    isFragile: { type: Boolean, default: false },
    requiresTemperatureControl: { type: Boolean, default: false },
    isOversized: { type: Boolean, default: false },
    requiresSpecialEquipment: { type: Boolean, default: false }
});
const Zakaz = mongoose.model('Zakaz', zakazSchema);

module.exports = Zakaz;