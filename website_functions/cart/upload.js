const Product = require('../../models/product');
const Cart = require('../../models/cart');
const upload = (req, res) => {
    const {id,data}=req.params;
    Product.find({}, (err, products) => {
        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {
            
            Product.findById(id, (err, product) => {
      
                res.render('./website/cart/upload.jade', { products: products, carts: carts, user: req.user,product:product,data:JSON.parse(data),files:[] })
      
            })
            
         })
    })
}
module.exports = upload