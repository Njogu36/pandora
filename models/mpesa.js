const mongoose = require('mongoose');
const MPESASchema = mongoose.Schema({
    passkey:String,
    shortcode:String,
    tillNumber:String,
    basicAuthorizationKey:String
})
const MPESA = mongoose.model('MPESA', MPESASchema);
module.exports = MPESA;