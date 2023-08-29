const Product = require('../../models/product')
const update_image = (req, res) => {
    const { id } = req.params

    let path = '';
    if (req.file) {
        path = '/product_logos/' + req.file.filename;
    }
    let query = {
        _id:id
    }
    let data = {};
    data.cover = path;
    Product.updateOne(query, data, (err, product) => {
        req.flash('info', 'Product image updated successfully');
        res.redirect('/admin/products/view_product/'+id)
    })

    


}
module.exports = update_image