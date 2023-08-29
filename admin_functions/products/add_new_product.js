const Product = require('../../models/product')
const add_new_product = (req, res) => {
    const { name, description, checkout_options } = req.body

    let path = '';
    if (req.file) {
        path = '/product_logos/' + req.file.filename;
    }

    if (checkout_options === undefined) {
        req.flash('danger', 'Kindly select atleast one checkout options.');
        req.redirect('/admin/products')
    }
    else if (checkout_options !== undefined) {
        let checkout_options_array = []
        if (!Array.isArray(checkout_options)) {
            checkout_options_array.push(checkout_options)
        }
        else {
            checkout_options_array = checkout_options
        }
        Product.findOne({ name: name }, (err, product) => {
            if (product) {
                req.flash('danger', 'Product name already exists');
                res.redirect('/admin/products')

            }
            else {
                let data = new Product({
                    name: name,
                    description: description,
                    checkout_options: checkout_options_array,
                    cover: path,
                    show:true,
                    price:""
                })
                data.save((err, product) => {
                    req.flash('info', 'Product saved successfully');
                    res.redirect('/admin/products')
                })
            }
        })





    }


}
module.exports = add_new_product