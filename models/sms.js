const mongoose = require('mongoose');
const SMSSchema = mongoose.Schema({
    sender_id:String,
    username:String,
    passkey:String
})
const SMS = mongoose.model('SMS', SMSSchema);
module.exports = SMS;