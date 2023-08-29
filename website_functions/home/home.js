const Product = require('../../models/product');
const Cart = require('../../models/cart');

const home = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
            res.render('./website/home/home.jade', {
                products: products,
                user: req.user,
                carts: carts
            })
        })
    })

}
module.exports = home