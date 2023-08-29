const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    name:String,
    description:String,
    cover:String,
    categories:[],
    price:Number,
    currency:String,
    unit:String,
    checkout_options:[],
    show:Boolean,
    printing_options:[],
    free_designs:Boolean,
    printing_category:[]
})
const PRODUCT = mongoose.model('PRODUCT', ProductSchema);
module.exports = PRODUCT;