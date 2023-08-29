const mongoose = require('mongoose');
const CartSchema = mongoose.Schema({
    product_id:String,
    data:{},
    user_id:String,
    quantity:String,
    project_id:String
   
    
})
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;