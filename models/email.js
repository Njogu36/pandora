const mongoose = require('mongoose');
const EMAILSchema = mongoose.Schema({
    email:String,
    port:Number,
    password:String,
    host:String
})
const EMAIL = mongoose.model('EMAIL', EMAILSchema);
module.exports = EMAIL;