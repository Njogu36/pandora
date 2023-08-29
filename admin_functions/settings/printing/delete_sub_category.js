const Category = require('../../../models/category');

const add_sub_category = (req, res) => {
    const { id, no } = req.params;
    Category.findById(id, (err, category) => {
        if (category) {
            let sub_categories = category.sub_categories;
            let filter = sub_categories.filter((x) => {
                return parseInt(x.no) !== parseInt(no)
            })

           
            let query = {
                _id: id
            }
            let data = {};
            data.sub_categories = filter
            Category.updateOne(query, data, () => {
                req.flash('danger', 'Sub category deleted successfully.');
                res.redirect('/admin/settings')
            })
        }
    })
}
module.exports = add_sub_category