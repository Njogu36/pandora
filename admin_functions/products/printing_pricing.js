const Product = require('../../models/product')

const printing_pricing = (req, res) => {
    const { id } = req.params
    const { currency, price, printing_category } = req.body;

console.log(req.body)
    if (printing_category === undefined) {
        req.flash('danger', 'Kindly select atleast one printing options.');
        res.redirect('/admin/products/view_product/' + id)
    
    }
    else if (printing_category !== undefined) {
        let printing_category_array = []
        if (!Array.isArray(printing_category)) {
            printing_category_array.push(printing_category)
        }
        else {
            printing_category_array = printing_category
        }

        let query = {
            _id: id
        }
        let data = {
            price:price,
            currency: currency,
            printing_category: printing_category_array,
        }
        Product.updateOne(query, data, () => {
            req.flash('info', 'Product updated successfully');
            res.redirect('/admin/products/view_product/' + id)
        })

    }

}
module.exports = printing_pricing