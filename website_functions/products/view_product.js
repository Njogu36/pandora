const Product = require('../../models/product');
const Category = require('../../models/category');
const Cart = require('../../models/cart');

const badges = (req, res) => {
    Product.find({}, (err, products) => {
        Product.findOne({ name: req.params.name }, async(err, product) => {
            let categories = []
          
            if (product.printing_category !== undefined) {
              await product.printing_category.map((x)=>{
                    Category.findById(x,(err,cat)=>{
                        if(cat)
                        {
                            
                            categories.push(cat)
                        }
                    })
              })
                
            }
            setTimeout(()=>{
                Cart.find({user_id:req.user?req.user.id:''},(err,carts)=>{
                    res.render('./website/products/product.jade', { products: products, product: product ,categories:categories,
                        user:req.user,carts:carts})
                })
               
    
            },1000)
            
         })
    })
}
module.exports = badges