const Product = require('../../models/product');
const Cart = require('../../models/cart');
const customer_info = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
           
           
                res.render('./website/account/customer_info.jade', { products: products, carts: carts, user: req.user })
      
            
         })
    })
}
module.exports = customer_info