const User = require('../../models/user')
const customers = (req,res)=>{
    User.find({role:"Self"},(err,users)=>{
        res.render('./administrator/customers/customers.jade',{
            user:req.user,
            url:req.originalUrl,
            users:users
        })
    })
    
}
module.exports = customers