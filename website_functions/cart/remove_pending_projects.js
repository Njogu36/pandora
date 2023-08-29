const Product = require('../../models/product');
const Cart = require('../../models/cart');
const Project = require('../../models/project');
const remove_pending_projects = (req, res) => {
  Project.find({user_id:req.user.id,status:"Pending"},(err,projects)=>{
    projects.map((item)=>{
        Project.findByIdAndRemove(item.id,()=>{
            console.log("project removed");
        })
    })
  })

}
module.exports = remove_pending_projects