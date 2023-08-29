const Product = require('../../models/product')

const edit_product = (req, res) => {
    const { id } = req.params
    const { name, description, checkout_options } = req.body;


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
        Product.findOne({ name: name, _id: { $ne: id } }, (err, product) => {
            if (product) {
                req.flash('danger', 'Product name already exists');
                res.redirect('/admin/products/view_product/' + id)

            }
            else {
                let query = {
                    _id: id
                }
                let data = {
                    name: name,
                    description: description,
                    checkout_options: checkout_options_array,
                }
                Product.updateOne(query, data, () => {
                    req.flash('info', 'Product updated successfully');
                    res.redirect('/admin/products/view_product/' + id)
                })
            }
        })





    }

}
module.exports = edit_product