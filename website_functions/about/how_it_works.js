const Product = require('../../models/product');
const Cart = require('../../models/cart');

const how_it_works = (req, res) => {
    Product.find({},(err,products)=>{
        Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
   
    res.render('./website/about/how_it_works.jade',{products:products,
        user:req.user,carts:carts})
    })
})
}
module.exports = how_it_works