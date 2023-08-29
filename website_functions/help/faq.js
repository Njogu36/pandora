const Product = require('../../models/product');
const Cart = require('../../models/cart');

const faq = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
        
    res.render('./website/help/faq.jade',{products:products,
    user:req.user,carts:carts})
        })
    })
}
module.exports = faq