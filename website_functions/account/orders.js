const Product = require('../../models/product');
const Cart = require('../../models/cart');
const  orders = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
           
           
                res.render('./website/account/orders.jade', { products: products, carts: carts, user: req.user })
      
            
         })
    })
}
module.exports = orders