const Product = require('../../models/product');
const Cart = require('../../models/cart');
const billing_details = (req, res) => {
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user ? req.user.id : '' }, (err, carts) => {
            let sub_total = 0
            carts.map((item) => {
                Product.findById(item.product_id, (err, product) => {
                    item.product = product;
                    sub_total += product.price * parseFloat(item.quantity)
                })
            })
            setTimeout(()=>{
                res.render('./website/checkout/billing_details.jade', { products: products, carts: carts, user: req.user,sub_total:sub_total })
      
            },2000)
           
        })
    })
}
module.exports = billing_details