const Product = require('../../models/product');
const Cart = require('../../models/cart');
const  saved_projects = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
           
           
                res.render('./website/account/saved_projects.jade', { products: products, carts: carts, user: req.user })
      
            
         })
    })
}
module.exports = saved_projects