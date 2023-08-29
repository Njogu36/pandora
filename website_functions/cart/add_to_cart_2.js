const Product = require('../../models/product');
const Cart = require('../../models/cart');
const Project = require('../../models/project');
const add_to_cart = (req, res) => {
    
    const {project }  = req.body;
    if (!req.user) {
        res.redirect('/')
    }
    else {
        let query = {
            _id:project._id
        }
        let data = {};
        data.status = 'Added To Basket';
        Project.updateOne(query,data,()=>{
            
        })
        Cart.findOne({ user_id: req.user ? req.user.id : '',project_id:project._id}, (err, cart) => {
            
            if(cart) {
                let query = {
                    _id:cart.id
                }
                 let data = {};
                data.data = JSON.parse(project.data)
                Cart.updateOne(query,data,() => {
                    res.send({success:true})
                })
            }
            else
            {
                let da = JSON.parse(project.data)
                let qty = da.Quantity
                let data = new Cart({
                    product_id: project.product_id,
                    data: JSON.parse(project.data),
                    user_id: req.user.id,
                    quantity:qty,
                    project_id:project._id
                })
               
                data.save(() => {
                    res.send({success:true})
                })
            }
               
            
        })
       

    }
 

}
module.exports = add_to_cart