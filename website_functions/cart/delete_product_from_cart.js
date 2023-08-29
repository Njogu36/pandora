const Product = require('../../models/product');
const Cart = require('../../models/cart');

const add_to_cart = (req, res) => {
  Cart.findByIdAndRemove(req.params.id,()=>{
    res.redirect('/cart')
  })

}
module.exports = add_to_cart