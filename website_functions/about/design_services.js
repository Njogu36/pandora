const Product = require('../../models/product');
const Cart = require('../../models/cart');

const design_services = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
   
    res.render('./website/about/design_services.jade',{products:products,
        user:req.user,carts:carts})
    })
})
}
module.exports = design_services