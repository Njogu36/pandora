const Product = require('../../models/product')
const Category = require('../../models/category')
const products= (req,res)=>{
    const  { id } = req.params
    Product.findById(id,(err,product)=>{
        Category.find({},(err,categories)=>{
            res.render('./administrator/products/view_product.jade',{
                user:req.user,
                url:req.originalUrl,
                product:product,
                categories:categories
            })
        })
       
    })
   
}
module.exports = products