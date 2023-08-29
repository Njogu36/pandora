const Product = require('../../models/product')
const products= (req,res)=>{
    Product.find({},(err,products)=>{
        res.render('./administrator/products/products.jade',{
            user:req.user,
            url:req.originalUrl,
            products:products
        })
    }).sort({_id:1})
   
}
module.exports = products