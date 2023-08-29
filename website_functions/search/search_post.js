const Product = require('../../models/product');
const Category = require('../../models/category');
const Cart = require('../../models/cart');

const search = (req, res) => {

    const { product } = req.body;

    Product.findOne({ name: product }, (err, prod) => {
        if (prod) {
            res.redirect('/product/' + prod.name)
        }
        else {

            Product.collection.createIndex({ name: "text", description: 'text' })
            Product.find({ $text: { $search: product } }, (err, searched_products) => {
                Product.find({}, (err, products) => {
                    Category.find({}, (err, categories) => {
                        Cart.find({ user_id: req.user?req.user.id:'' }, (err, carts) => {

                            res.render('./website/search/search.jade', {
                                products: products, searched_products: searched_products, product: product, categories: categories,
                                user: req.user, carts: carts
                            })
                        })

                    })
                })
            })


        }
    })
}
module.exports = search