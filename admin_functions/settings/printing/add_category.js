const Category = require('../../../models/category');
const add_category = (req,res)=>{
    const {  title,has_icons } = req.body;
    Category.findOne({title:title},(err,category)=>{
        if(category)
        {
            req.flash('danger','Title already exists');
            res.redirect('/admin/settings')

        }
        else
        {
            let data = new Category({
                title:title,
                has_icons:has_icons,
                sub_categories:[]
            })
            data.save(()=>{
                req.flash('success','Title added successfully.');
                res.redirect('/admin/settings')
            })

        }
    })

}
module.exports = add_category