const Product = require('../../models/product');
const Cart = require('../../models/cart');

const why_pandora_prints = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
   
    res.render('./website/about/why_pandora_prints.jade',{products:products,
        user:req.user,carts:carts})
    })
})
}
module.exports = why_pandora_prints