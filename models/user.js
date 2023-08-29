const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    phone_number:String,
    company:String,
    address_line_1:String,
    address_line_2:String,
    town:String,
    country:String,
    postcode:String,
    type:String,
    role:String,
    password: String,
    
})
const User = mongoose.model('User', UserSchema);
module.exports = User;