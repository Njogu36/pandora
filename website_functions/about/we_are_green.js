const Product = require('../../models/product');
const Cart = require('../../models/cart');

const we_are_green = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
   
    res.render('./website/about/we_are_green.jade',{products:products,
        user:req.user,carts:carts})
    })
})
}
module.exports = we_are_green