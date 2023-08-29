const Product = require('../../models/product');
const Cart = require('../../models/cart');
const  change_password = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
           
           
                res.render('./website/account/change_password.jade', { products: products, carts: carts, user: req.user })
      
            
         })
    })
}
module.exports = change_password