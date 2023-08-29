const Product = require('../../models/product');
const Cart = require('../../models/cart');

const meet_the_paper = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
   
    res.render('./website/about/meet_the_paper.jade',{products:products,
        user:req.user,carts:carts})
    })
})
}
module.exports = meet_the_paper