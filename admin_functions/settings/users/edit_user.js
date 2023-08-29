const User = require('../../../models/user')
const edit_user = (req,res)=> {
    const { first_name,last_name,email,role,id } = req.body
    let query = {
        _id:id
    }
    let data  = {};
    data.first_name = first_name; 
    data.last_name = last_name;
    data.username = email;
    data.role = role;
    User.updateOne(query,data,()=>{
        req.flash('info','User details updated successfully.');
        res.redirect('/admin/settings#navs-system-users')
    })
   
}
module.exports = edit_user