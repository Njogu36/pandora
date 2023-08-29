const Category = require('../../../models/category');

const add_sub_category = (req, res) => {
    const { id, name ,icon} = req.body;
    let ico = ''
    if(icon !== undefined)
    {
        ico = icon
    }
    console.log(req.body)
   
    
    Category.findById(id, (err, category) => {
        if (category) {
            if(category.has_icons === 'Yes')
            {
                if(icon === undefined)
                {
                    req.flash('danger', 'Kindly select an icon.');
                    res.redirect('/admin/settings');
                }
                else if(icon !== undefined)
                {
                   render()
                }
            }
            else if(category.has_icons === 'No')
            {
              render()
            }
            function render()
            {
                let sub_categories = category.sub_categories;
                let filter = sub_categories.filter((x) => {
                    return x.name === name
                });
                if (filter.length === 0) {
                    sub_categories.unshift({
                        no: sub_categories.length + 1,
                        name: name,
                        icon:ico
                    });
                    let query = {
                        _id: id
                    }
                    let data = {};
                    data.sub_categories = sub_categories;
                    
                    Category.updateOne(query, data, () => {
                        req.flash('info', 'Sub category added successfully.');
                        res.redirect('/admin/settings');
                    });
                }
                else {
                    req.flash('danger', 'Sub category already exists.');
                    res.redirect('/admin/settings');
                }
            }
          
        }
    })
}
module.exports = add_sub_category