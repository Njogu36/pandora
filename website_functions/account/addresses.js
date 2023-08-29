const Product = require('../../models/product');
const Cart = require('../../models/cart');
const  addresses = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
           
           
                res.render('./website/account/addresses.jade', { products: products, carts: carts, user: req.user })
      
            
         })
    })
}
module.exports = addresses