const Product = require('../../models/product');
const Cart = require('../../models/cart');

const terms_and_conditions = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
        
    res.render('./website/help/terms_and_conditions.jade',{products:products,
        user:req.user,carts:carts})
    })
    })
}
module.exports = terms_and_conditions