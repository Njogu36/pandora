const Product = require('../../models/product');
const Cart = require('../../models/cart');


const product_template_guides = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
        
    res.render('./website/help/product_template_guides.jade',{products:products,
        user:req.user,carts:carts})
    })
    })
}
module.exports = product_template_guides