const Category = require('../../../models/category');
const delete_category = (req,res)=>{
    const {  id  } = req.params;
    Category.findByIdAndDelete(id,()=>{
        req.flash('danger','Category deleted successfully.');
        res.redirect('/admin/settings')
    })
}
module.exports = delete_category