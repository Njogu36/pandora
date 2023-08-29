const Product = require('../../models/product');
const Cart = require('../../models/cart');

const add_to_cart = (req, res) => {
    console.log(req.body)
    const { button } = req.body
    if (!req.user) {
        res.redirect('/')
    }
    else {
        delete req.body.button
        if (button === 'design_for_me') {
            Product.find({}, (err, products) => {
                Product.findById(req.params.id, (err, product) => {
                    console.log(req.params.id)
                    Cart.findOne({ user_id: req.user ? req.user.id : '', product_id: req.params.id }, (err, cart) => {
                        if (cart) {
                            let query = {
                                _id: cart.id
                            }
                            let data = {};
                            data.data = req.body
                            data.quantity = req.body.Quantity

                            Cart.updateOne(query, data, () => {
                                Cart.find({ user_id: req.user ? req.user.id : '' }, (err, carts) => {
                                    res.redirect('/cart')
                                })
                            })
                        }
                        else {
                            let data = new Cart({
                                product_id: product.id,
                                data: req.body,
                                user_id: req.user.id,
                                quantity: req.body.Quantity,
                                project_id:""
                            })
                            data.save(() => {
                                res.redirect('/cart')
                            })
                        }
                    })

                });
            })
        }
        else if (button === 'upload_file') {
            Product.findById(req.params.id, (err, product) => {
                res.redirect(`/cart/upload/${product.id}/${JSON.stringify(req.body)}`)
            })

        }
        else if (button === 'design_online') {
            Product.findById(req.params.id, (err, product) => {
                res.redirect('/product/' + product.name)
            })
        }


    }

}
module.exports = add_to_cart