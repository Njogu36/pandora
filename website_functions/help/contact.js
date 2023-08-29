const Product = require('../../models/product');
const Cart = require('../../models/cart');

const contact = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
             
    res.render('./website/help/contact.jade',{products:products,carts:carts})
    })
})
}
module.exports = contact