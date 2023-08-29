const Product = require('../../models/product');
const Cart = require('../../models/cart');
const Project = require('../../models/project');
const save_as_project = (req, res) => {
    Project.findOne({user_id:req.user.id,status:"Pending"},(err,project)=>{
        if(project)
        {
            let query = {
                _id:project.id
            }
            let data = {};
            data.images = req.body.images;
            Project.updateOne(query,data,()=>{
                res.status(200).json({ success: true, message: 'Project saved successfully',project:project});
          
            })
           
        }
        else
        {
            let data = new Project({
                product_id:req.body.product._id,
                data:req.body.data,
                images:req.body.images,
                user_id:req.user.id,
                status:'Pending'
            })
            data.save((err,result)=>{
                res.status(200).json({ success: true, message: 'Project saved successfully',project:result});
          
            })
        }
    })
   

}
module.exports = save_as_project