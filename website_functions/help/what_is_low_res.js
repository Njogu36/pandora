const Product = require('../../models/product');
const Cart = require('../../models/cart');

const what_is_low_res = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
        
        res.render('./website/help/what_is_low_res.jade',{products:products,
            user:req.user,carts:carts})
        })
    })
    
}
module.exports = what_is_low_res