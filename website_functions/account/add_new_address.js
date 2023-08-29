const Product = require('../../models/product');
const Cart = require('../../models/cart');
const  add_new_address = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
           
           
                res.render('./website/account/add_new_address.jade', { products: products, carts: carts, user: req.user })
      
            
         })
    })
}
module.exports = add_new_address