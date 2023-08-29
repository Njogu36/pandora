const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    title:String,
    has_icons:String,
    sub_categories:[]
})
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;